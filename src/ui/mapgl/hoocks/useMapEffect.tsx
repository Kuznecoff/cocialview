import { EffectCallback, useEffect } from 'react';
import { useMapglContext } from '../mapglContext';


/**
 * Provide use side effects on the map
 *
 * useMapEffect(
 * ({ map }) => {
 *   map.setCenter(center);
 * }
 */
export const useMapEffect = (
  effect: (params: { mapglInstance: mapgl.Map ; mapgl: typeof mapgl }) => ReturnType<EffectCallback>,
  deps: any[],
) => {
  const { mapgl, mapglInstance } = useMapglContext();

  return useEffect(() => {
    if (!mapglInstance || !mapgl) {
      return;
    }

    return effect({ mapglInstance, mapgl });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapglInstance, mapgl, ...deps]);
};