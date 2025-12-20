import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import type { MutableRefObject } from 'react';
import type { City } from '../types/offer';
import useMap from './use-map';

type LeafletMapOptions = {
  center: { lat: number; lng: number };
  zoom: number;
};

type LeafletMapInstance = {
  addLayer: (layer: unknown) => void;
};

const leafletMocks = vi.hoisted(() => {
  const addLayerMock = vi.fn<[unknown], void>();

  const mapInstance: LeafletMapInstance = {
    addLayer: addLayerMock,
  };

  const MapMock = vi.fn<[HTMLDivElement, LeafletMapOptions], LeafletMapInstance>(
    () => mapInstance
  );

  const TileLayerMock = vi.fn<[string, { attribution: string }], unknown>(() => ({}));

  return { addLayerMock, mapInstance, MapMock, TileLayerMock };
});

vi.mock('leaflet', () => ({
  Map: leafletMocks.MapMock as unknown as new (
    element: HTMLDivElement,
    options: LeafletMapOptions
  ) => LeafletMapInstance,
  TileLayer: leafletMocks.TileLayerMock as unknown as new (
    url: string,
    options: { attribution: string }
  ) => unknown,
}));

const makeCity = (name: string, lat: number, lng: number, zoom: number): City => ({
  name,
  location: { latitude: lat, longitude: lng, zoom },
});

describe('Hook: useMap', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return null when ref.current is null', () => {
    const city = makeCity('Paris', 48.8566, 2.3522, 12);
    const ref = { current: null } as MutableRefObject<HTMLDivElement | null>;

    const { result } = renderHook(() => useMap(ref, city));

    expect(result.current).toBeNull();
    expect(leafletMocks.MapMock).not.toHaveBeenCalled();
    expect(leafletMocks.TileLayerMock).not.toHaveBeenCalled();
    expect(leafletMocks.addLayerMock).not.toHaveBeenCalled();
  });

  it('should create leaflet map once and add tile layer', async () => {
    const city = makeCity('Paris', 48.8566, 2.3522, 12);
    const div = document.createElement('div');
    const ref = { current: div } as MutableRefObject<HTMLDivElement | null>;

    const { result } = renderHook(() => useMap(ref, city));

    await waitFor(() => expect(result.current).not.toBeNull());

    expect(leafletMocks.MapMock).toHaveBeenCalledTimes(1);
    expect(leafletMocks.MapMock).toHaveBeenCalledWith(div, {
      center: { lat: city.location.latitude, lng: city.location.longitude },
      zoom: city.location.zoom,
    });

    expect(leafletMocks.TileLayerMock).toHaveBeenCalledTimes(1);
    expect(leafletMocks.addLayerMock).toHaveBeenCalledTimes(1);
  });

  it('should not recreate map after first render when city changes', async () => {
    const city1 = makeCity('Paris', 48.8566, 2.3522, 12);
    const city2 = makeCity('Amsterdam', 52.3676, 4.9041, 10);

    const div = document.createElement('div');
    const ref = { current: div } as MutableRefObject<HTMLDivElement | null>;

    const { result, rerender } = renderHook(({ city }) => useMap(ref, city), {
      initialProps: { city: city1 },
    });

    await waitFor(() => expect(result.current).not.toBeNull());
    expect(leafletMocks.MapMock).toHaveBeenCalledTimes(1);

    rerender({ city: city2 });
    expect(leafletMocks.MapMock).toHaveBeenCalledTimes(1);
  });
});
