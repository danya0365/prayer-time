"use client";

import type { CreateHomeItemData, HomeItem, UpdateHomeItemData } from "@/src/application/repositories/IHomeRepository";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { HomePresenter, HomeViewModel } from "./HomePresenter";
import { createClientHomePresenter } from "./HomePresenterClientFactory";

export interface HomePresenterState {
  viewModel: HomeViewModel | null;
  loading: boolean;
  error: string | null;
  isCreateModalOpen: boolean;
  isEditModalOpen: boolean;
  isDeleteModalOpen: boolean;
  selectedItemId: string | null;
}

export interface HomePresenterActions {
  loadData: () => Promise<void>;
  createHomeItem: (data: CreateHomeItemData) => Promise<void>;
  updateHomeItem: (data: UpdateHomeItemData & { id: string }) => Promise<void>;
  deleteHomeItem: (id: string) => Promise<void>;
  getHomeItemById: (id: string) => Promise<HomeItem | null>;
  openCreateModal: () => void;
  closeCreateModal: () => void;
  openEditModal: (itemId: string) => void;
  closeEditModal: () => void;
  openDeleteModal: (itemId: string) => void;
  closeDeleteModal: () => void;
  setError: (error: string | null) => void;
}

export function useHomePresenter(
  initialViewModel?: HomeViewModel,
  presenterOverride?: HomePresenter
): [HomePresenterState, HomePresenterActions] {
  const presenter = useMemo(
    () => presenterOverride ?? createClientHomePresenter(),
    [presenterOverride]
  );
  
  const isMountedRef = useRef(true);
  const abortControllerRef = useRef<AbortController | null>(null);

  const [viewModel, setViewModel] = useState<HomeViewModel | null>(
    initialViewModel || null
  );
  const [loading, setLoading] = useState(!initialViewModel);
  const [error, setError] = useState<string | null>(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    if (abortControllerRef.current) abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const newViewModel = await presenter.getViewModel();
      if (isMountedRef.current) {
        setViewModel(newViewModel);
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      if (isMountedRef.current) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, [presenter]);

  const createHomeItem = useCallback(async (data: CreateHomeItemData) => {
    setLoading(true);
    setError(null);
    try {
      await presenter.createHomeItem(data);
      if (isMountedRef.current) setIsCreateModalOpen(false);
      await loadData();
    } catch (err) {
      if (isMountedRef.current) {
        setError(err instanceof Error ? err.message : "Unknown error");
      }
      throw err;
    } finally {
      if (isMountedRef.current) setLoading(false);
    }
  }, [loadData, presenter]);

  const updateHomeItem = useCallback(async (data: UpdateHomeItemData & { id: string }) => {
    setLoading(true);
    setError(null);
    try {
      await presenter.updateHomeItem(data.id, data);
      if (isMountedRef.current) {
        setIsEditModalOpen(false);
        setSelectedItemId(null);
      }
      await loadData();
    } catch (err) {
      if (isMountedRef.current) {
        setError(err instanceof Error ? err.message : "Unknown error");
      }
      throw err;
    } finally {
      if (isMountedRef.current) setLoading(false);
    }
  }, [loadData, presenter]);

  const deleteHomeItem = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await presenter.deleteHomeItem(id);
      if (isMountedRef.current) {
        setIsDeleteModalOpen(false);
        setSelectedItemId(null);
      }
      await loadData();
    } catch (err) {
      if (isMountedRef.current) {
        setError(err instanceof Error ? err.message : "Unknown error");
      }
      throw err;
    } finally {
      if (isMountedRef.current) setLoading(false);
    }
  }, [loadData, presenter]);

  const getHomeItemById = useCallback(async (id: string) => {
    try {
      return await presenter.getHomeItemById(id);
    } catch (err) {
      if (isMountedRef.current) {
        setError(err instanceof Error ? err.message : "Unknown error");
      }
      throw err;
    }
  }, [presenter]);

  const openCreateModal = useCallback(() => { setIsCreateModalOpen(true); setError(null); }, []);
  const closeCreateModal = useCallback(() => { setIsCreateModalOpen(false); setError(null); }, []);
  const openEditModal = useCallback((itemId: string) => { setSelectedItemId(itemId); setIsEditModalOpen(true); setError(null); }, []);
  const closeEditModal = useCallback(() => { setIsEditModalOpen(false); setSelectedItemId(null); setError(null); }, []);
  const openDeleteModal = useCallback((itemId: string) => { setSelectedItemId(itemId); setIsDeleteModalOpen(true); setError(null); }, []);
  const closeDeleteModal = useCallback(() => { setIsDeleteModalOpen(false); setSelectedItemId(null); setError(null); }, []);

  useEffect(() => {
    if (!initialViewModel) {
      loadData();
    }
  }, [loadData, initialViewModel]);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, []);

  return [
    {
      viewModel,
      loading,
      error,
      isCreateModalOpen,
      isEditModalOpen,
      isDeleteModalOpen,
      selectedItemId,
    },
    {
      loadData,
      createHomeItem,
      updateHomeItem,
      deleteHomeItem,
      getHomeItemById,
      openCreateModal,
      closeCreateModal,
      openEditModal,
      closeEditModal,
      openDeleteModal,
      closeDeleteModal,
      setError,
    },
  ];
}
