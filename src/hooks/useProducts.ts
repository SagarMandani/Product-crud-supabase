import { useState, useCallback, useRef } from 'react';
import { getProducts, deleteProduct } from '../services/productService';
import { Strings } from '../common';
import { showToast, formatApiError } from '../common/utils';

const useProducts = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  /** Har nayi load ke liye number — purani request complete hone par ignore */
  const loadSeqRef = useRef(0);

  const loadProducts = useCallback(async (isRefresh = false) => {
    const seq = ++loadSeqRef.current;
    if (isRefresh) {
      setLoading(true);
    }
    try {
      const response = await getProducts();
      if (seq !== loadSeqRef.current) {
        return;
      }
      setProducts(Array.isArray(response) ? response : []);
    } catch (error: any) {
      if (seq !== loadSeqRef.current) {
        return;
      }
      showToast(
        Strings.proErr,
        formatApiError(error),
        'error',
      );
    } finally {
      if (seq === loadSeqRef.current) {
        setLoading(false);
      }
    }
  }, []);

  const onDelete = useCallback(
    async (id: number) => {
      try {
        await deleteProduct(id);
        showToast(Strings.proErr, Strings.proDeleteMsg, 'success');
        await loadProducts();
      } catch (error: any) {
        showToast(
          Strings.proErr,
          formatApiError(error),
          'error',
        );
      }
    },
    [loadProducts],
  );

  return {
    loading,
    products,
    loadProducts,
    onDelete,
  };
};

export default useProducts;
