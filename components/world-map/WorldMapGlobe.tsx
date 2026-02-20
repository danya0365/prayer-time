"use client";

import { City, WORLD_CITIES } from "@/constants/cities";
import * as d3 from "d3";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";

interface WorldMapGlobeProps {
  onCitySelect: (city: City) => void;
  selectedCity: City | null;
}

export interface WorldMapGlobeRef {
  zoomTo: (lon: number, lat: number, k?: number) => void;
}

interface WorldTopology extends Topology {
  objects: {
    countries: GeometryCollection;
    land: GeometryCollection;
  };
}

const CONTINENTS = [
  { name: "AFRICA", coords: [20, 10] as [number, number] },
  { name: "ASIA", coords: [90, 35] as [number, number] },
  { name: "EUROPE", coords: [15, 50] as [number, number] },
  { name: "NORTH AMERICA", coords: [-100, 45] as [number, number] },
  { name: "SOUTH AMERICA", coords: [-60, -20] as [number, number] },
  { name: "OCEANIA", coords: [135, -25] as [number, number] },
  { name: "ANTARCTICA", coords: [0, -80] as [number, number] },
];


export default forwardRef<WorldMapGlobeRef, WorldMapGlobeProps>(function WorldMapGlobe({ onCitySelect, selectedCity }, ref) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [hoveredCity, setHoveredCity] = useState<City | null>(null);
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  
  // Use refs to avoid re-rendering the entire D3 scene when these change
  const selectedCityRef = useRef<City | null>(selectedCity);
  const onCitySelectRef = useRef(onCitySelect);
  const projectionRef = useRef<d3.GeoProjection | null>(null);
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  
  // Keep refs in sync
  useEffect(() => {
    selectedCityRef.current = selectedCity;
  }, [selectedCity]);
  
  useEffect(() => {
    onCitySelectRef.current = onCitySelect;
  }, [onCitySelect]);

  // Update marker colors when selectedCity changes (without re-rendering the full map)
  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll<SVGCircleElement, City>(".city-marker")
      .attr("fill", (d) =>
        selectedCity && d.name === selectedCity.name
          ? "#10b981"
          : "#34d399"
      );
  }, [selectedCity]);

  // Responsive dimension tracking
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // D3 map rendering — only depends on dimensions
  useEffect(() => {
    if (!svgRef.current || dimensions.width === 0 || dimensions.height === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const { width, height } = dimensions;

    // Projection
    const projection = d3
      .geoNaturalEarth1()
      .fitSize([width, height], { type: "Sphere" })
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    // Root group for zoom
    const g = svg.append("g");

    // Zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 20])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
        const k = event.transform.k;
        
        // Scale markers inversely so they stay the same visual size
        g.selectAll<SVGCircleElement, City>(".city-marker")
          .attr("r", (d) => getMarkerRadius(d.population) / k);
        g.selectAll<SVGCircleElement, City>(".city-pulse")
          .attr("r", (d) => (getMarkerRadius(d.population) + 3) / k);
        g.selectAll(".city-marker, .city-pulse")
          .style("stroke-width", `${1 / k}px`);
        g.selectAll(".country-path")
          .style("stroke-width", `${0.5 / k}px`);
        g.selectAll(".graticule")
          .style("stroke-width", `${0.3 / k}px`);
        
        // Province boundaries: scale stroke and fade in based on zoom
        g.selectAll<SVGPathElement, unknown>(".province-path")
          .style("stroke-width", `${0.8 / k}px`)
          .style("opacity", k < 6 ? 0 : Math.min(0.2 + (k - 6) * 0.2, 0.8))
          .style("display", k < 5.8 ? "none" : ("inline" as string));

        // Dynamic labels visibility
        g.selectAll<SVGTextElement, unknown>(".continent-label")
          .style("opacity", Math.max(0, 1 - (k - 1) * 1.5))
          .style("display", k > 2 ? "none" : "");

        g.selectAll<SVGTextElement, unknown>(".country-label")
          .style("opacity", k < 1.5 ? 0 : Math.min((k - 1.5) * 1.5, 1))
          .style("display", k < 1.4 || k > 8 ? "none" : "")
          .style("font-size", `${Math.max(2, 8 / k)}px`);
      });

    svg.call(zoom);
    projectionRef.current = projection;
    zoomRef.current = zoom;

    // Ocean background
    g.append("path")
      .datum({ type: "Sphere" } as d3.GeoPermissibleObjects)
      .attr("d", path)
      .attr("fill", "#0c1426")
      .attr("stroke", "#1a3a5c")
      .attr("stroke-width", 1);

    // Graticule (grid lines)
    const graticule = d3.geoGraticule10();
    g.append("path")
      .datum(graticule)
      .attr("class", "graticule")
      .attr("d", path)
      .attr("fill", "none")
      .attr("stroke", "rgba(100, 160, 255, 0.08)")
      .attr("stroke-width", 0.3);

    // Load both countries and provinces data in parallel
    Promise.all([
      d3.json<WorldTopology>("https://unpkg.com/world-atlas@2/countries-50m.json"),
      d3.json<GeoJSON.FeatureCollection>("/data/provinces-50m.geojson"),
      d3.json<GeoJSON.FeatureCollection>("/data/thailand-provinces.geojson"),
    ]).then(([world, provincesData, thailandProvincesData]) => {
      if (!world) return;

      const countries = feature(world, world.objects.countries);

      // ── Render countries ──────────────────────────────────
      g.selectAll(".country-path")
        .data((countries as GeoJSON.FeatureCollection).features)
        .enter()
        .append("path")
        .attr("class", "country-path")
        .attr("d", path as never)
        .attr("fill", "#162a47")
        .attr("stroke", "#1e4976")
        .attr("stroke-width", 0.5)
        .style("cursor", "default")
        .style("transition", "fill 0.2s ease")
        .on("mouseover", function () {
          d3.select(this).attr("fill", "#1e3a5c");
        })
        .on("mouseout", function () {
          d3.select(this).attr("fill", "#162a47");
        });

      // ── Render continent labels ───────────────────────────
      const labelsGroup = g.append("g").attr("class", "labels-layer");
      
      labelsGroup.selectAll(".continent-label")
        .data(CONTINENTS)
        .enter()
        .append("text")
        .attr("class", "continent-label")
        .attr("x", d => projection(d.coords)?.[0] || 0)
        .attr("y", d => projection(d.coords)?.[1] || 0)
        .attr("text-anchor", "middle")
        .attr("fill", "rgba(255, 255, 255, 0.4)")
        .style("font-size", "14px")
        .style("font-weight", "600")
        .style("letter-spacing", "0.2em")
        .style("pointer-events", "none")
        .text(d => d.name);

      // ── Render country labels ─────────────────────────────
      labelsGroup.selectAll<SVGTextElement, GeoJSON.Feature>(".country-label")
        .data((countries as GeoJSON.FeatureCollection).features)
        .enter()
        .append("text")
        .attr("class", "country-label")
        .attr("x", (d) => path.centroid(d)[0])
        .attr("y", (d) => path.centroid(d)[1])
        .attr("text-anchor", "middle")
        .attr("fill", "rgba(255, 255, 255, 0.6)")
        .style("font-size", "11px")
        .style("pointer-events", "none")
        .style("opacity", 0)
        .style("display", "none")
        .text((d) => (d.properties?.name as string) || "");

      // ── Render province boundaries (AFTER countries so they draw on top) ──
      const provincesGroup = g.append("g").attr("class", "provinces-layer");
      
      const renderProvinces = (data: GeoJSON.FeatureCollection | undefined | null) => {
        if (!data || !data.features) return;
        
        const uniqueId = Math.random().toString(36).substr(2, 9);

        // Province Boundaries
        provincesGroup
          .selectAll(`.province-path-${uniqueId}`)
          .data(data.features)
          .enter()
          .append("path")
          .attr("class", "province-path province-path-item")
          .attr("d", path as never)
          .attr("fill", "rgba(255, 255, 255, 0)") // Transparent fill for hover detection
          .attr("stroke", "rgba(255, 255, 255, 0.7)")
          .attr("stroke-width", 1.0)
          .style("opacity", 0)
          .style("display", "none")
          .style("pointer-events", "auto")
          .style("transition", "fill 0.2s ease")
          .on("mouseover", (event, d: GeoJSON.Feature) => {
             const props = d.properties || {};
             const name = (props.name || props.name_en || props.NAME_1) as string;
             setHoveredProvince(name);
             setTooltipPos({ x: event.clientX, y: event.clientY });
             d3.select(event.currentTarget).attr("fill", "rgba(52, 211, 153, 0.15)");
          })
          .on("mousemove", (event) => {
             setTooltipPos({ x: event.clientX, y: event.clientY });
          })
          .on("mouseout", (event) => {
             setHoveredProvince(null);
             d3.select(event.currentTarget).attr("fill", "rgba(255, 255, 255, 0)");
          })
          .on("click", (event, d: GeoJSON.Feature) => {
             event.stopPropagation();
             const centroid = path.centroid(d);
             const coords = projection.invert!([centroid[0], centroid[1]]);
             if (!coords) return;

             const props = d.properties || {};
             const name = (props.name || props.name_en || props.NAME_1) as string;
             const admin = (props.admin || props.country) as string;
             // If admin is missing, we check if it's from the Thailand dataset (often NAME_1)
             const countryName = admin || (props.NAME_1 ? "Thailand" : "Unknown");

             const virtualCity: City = {
               name: name,
               country: countryName,
               lat: coords[1],
               lon: coords[0],
               population: 0,
               timezone: countryName === "Thailand" ? "Asia/Bangkok" : "UTC",
             };

             onCitySelectRef.current(virtualCity);
          });
      };

      renderProvinces(provincesData);
      renderProvinces(thailandProvincesData);

      // ── Render city markers ───────────────────────────────
      const cityGroup = g.append("g").attr("class", "cities-layer");
      const capitalCities = WORLD_CITIES.filter(c => c.isCapital);

      // Pulse rings (animated)
      cityGroup
        .selectAll(".city-pulse")
        .data(capitalCities)
        .enter()
        .append("circle")
        .attr("class", "city-pulse")
        .attr("cx", (d) => {
          const coords = projection([d.lon, d.lat]);
          return coords ? coords[0] : 0;
        })
        .attr("cy", (d) => {
          const coords = projection([d.lon, d.lat]);
          return coords ? coords[1] : 0;
        })
        .attr("r", (d) => getMarkerRadius(d.population) + 3)
        .attr("fill", "none")
        .attr("stroke", "rgba(16, 185, 129, 0.3)")
        .attr("stroke-width", 1)
        .style("opacity", 0);

      // City dots
      cityGroup
        .selectAll<SVGCircleElement, City>(".city-marker")
        .data(capitalCities)
        .enter()
        .append("circle")
        .attr("class", "city-marker")
        .attr("cx", (d) => {
          const coords = projection([d.lon, d.lat]);
          return coords ? coords[0] : 0;
        })
        .attr("cy", (d) => {
          const coords = projection([d.lon, d.lat]);
          return coords ? coords[1] : 0;
        })
        .attr("r", (d) => getMarkerRadius(d.population))
        .attr("fill", (d) =>
          selectedCityRef.current && d.name === selectedCityRef.current.name
            ? "#10b981"
            : "#34d399"
        )
        .attr("stroke", "#0e2e1f")
        .attr("stroke-width", 1)
        .style("cursor", "pointer")
        .style("filter", "drop-shadow(0 0 4px rgba(16, 185, 129, 0.5))")
        .on("mouseover", function (event, d) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr("r", getMarkerRadius(d.population) * 1.8)
            .attr("fill", "#6ee7b7");

          setHoveredCity(d);
          setTooltipPos({ x: event.clientX, y: event.clientY });
        })
        .on("mousemove", function (event) {
          setTooltipPos({ x: event.clientX, y: event.clientY });
        })
        .on("mouseout", function (event, d) {
          const currentZoom = d3.zoomTransform(svgRef.current!);
          d3.select(this)
            .transition()
            .duration(200)
            .attr(
              "r",
              getMarkerRadius(d.population) / currentZoom.k
            )
            .attr("fill",
              selectedCityRef.current && d.name === selectedCityRef.current.name
                ? "#10b981"
                : "#34d399"
            );
          setHoveredCity(null);
        })
        .on("click", function (event, d) {
          event.stopPropagation();
          // Clear tooltip immediately on click
          setHoveredCity(null);
          onCitySelectRef.current(d);
        });
    });
  }, [dimensions]); // Only re-render when dimensions change

  // Expose zoomTo method at Top Level
  useImperativeHandle(ref, () => ({
    zoomTo: (lon: number, lat: number, k: number = 8) => {
      if (!svgRef.current || !projectionRef.current || !zoomRef.current) return;
      const svg = d3.select(svgRef.current);
      const { width, height } = dimensions;
      
      const coords = projectionRef.current([lon, lat]);
      if (!coords) return;
      
      svg.transition()
        .duration(1000)
        .call(
          zoomRef.current.transform,
          d3.zoomIdentity
            .translate(width / 2, height / 2)
            .scale(k)
            .translate(-coords[0], -coords[1])
        );
    }
  }), [dimensions]);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        className="w-full h-full"
        style={{ background: "#0a0f1c" }}
      />

      {/* Tooltip */}
      {hoveredCity && (
        <div
          className="fixed z-50 pointer-events-none px-3 py-2 rounded-lg text-sm font-medium shadow-xl"
          style={{
            left: tooltipPos.x + 14,
            top: tooltipPos.y - 14,
            background: "rgba(10, 20, 40, 0.92)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(52, 211, 153, 0.4)",
            color: "#e2e8f0",
          }}
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
            <span className="font-semibold text-white">{hoveredCity.name}</span>
          </div>
          <div className="text-xs opacity-70 mt-0.5">{hoveredCity.country}</div>
        </div>
      )}

      {/* Province Hover Tooltip */}
      {hoveredProvince && !hoveredCity && (
        <div
          className="fixed z-50 pointer-events-none px-2 py-1 rounded text-xs font-semibold shadow-lg"
          style={{
            left: tooltipPos.x + 12,
            top: tooltipPos.y - 12,
            background: "rgba(30, 41, 59, 0.85)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(140, 200, 255, 0.3)",
            color: "#cbd5e1",
          }}
        >
          {hoveredProvince}
        </div>
      )}

      {/* Legend */}
      <div
        className="absolute bottom-4 left-4 px-4 py-3 rounded-xl text-xs"
        style={{
          background: "rgba(10, 20, 40, 0.85)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(100, 160, 255, 0.15)",
          color: "#94a3b8",
        }}
      >
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
          <span>Click a city to view prayer times</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted">🖱️</span>
          <span>Scroll to zoom · Drag to pan</span>
        </div>
      </div>
    </div>
  );
});

function getMarkerRadius(population: number): number {
  if (population >= 15_000_000) return 5;
  if (population >= 5_000_000) return 4;
  if (population >= 1_000_000) return 3.5;
  return 2.5;
}
