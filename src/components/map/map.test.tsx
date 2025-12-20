import { render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { City, Offer } from '../../types/offer';
import Map from './map';
import useMap from '../../hooks/use-map';
import type { Map as LeafletMap } from 'leaflet';

vi.mock('leaflet/dist/leaflet.css', () => ({}));

vi.mock('../../hooks/use-map', () => ({
  default: vi.fn(),
}));

const leafletMocks = vi.hoisted(() => {
  const addToMock = vi.fn();

  const markerSetIconMock = vi.fn().mockReturnThis();
  const markerAddToMock = vi.fn().mockReturnThis();

  const MarkerMock = vi.fn().mockImplementation(() => ({
    setIcon: markerSetIconMock,
    addTo: markerAddToMock,
  }));

  const IconMock = vi.fn().mockImplementation((cfg: unknown) => cfg);

  const layerGroupMock = vi.fn().mockReturnValue({ addTo: addToMock });

  return {
    addToMock,
    markerSetIconMock,
    markerAddToMock,
    MarkerMock,
    IconMock,
    layerGroupMock,
  };
});

vi.mock('leaflet', () => ({
  Icon: leafletMocks.IconMock,
  Marker: leafletMocks.MarkerMock,
  layerGroup: leafletMocks.layerGroupMock,
}));

const makeCity = (): City => ({
  name: 'Paris',
  location: { latitude: 48.8566, longitude: 2.3522, zoom: 12 },
});

const makeOffer = (id: string): Offer =>
  ({
    id,
    location: { latitude: 48.85, longitude: 2.35, zoom: 12 },
  } as Offer);

describe('Component: Map', () => {
  const useMapMock = vi.mocked(useMap);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render section with default class', () => {
    useMapMock.mockReturnValue(null);

    const { container } = render(<Map city={makeCity()} offers={[]} />);
    const section = container.querySelector('section.cities__map.map');

    expect(section).toBeInTheDocument();
  });

  it('should not create markers if map is null', () => {
    useMapMock.mockReturnValue(null);

    render(<Map city={makeCity()} offers={[makeOffer('1')]} />);

    expect(leafletMocks.layerGroupMock).not.toHaveBeenCalled();
    expect(leafletMocks.MarkerMock).not.toHaveBeenCalled();
  });

  it('should create layer group and markers when map exists', () => {
    const removeLayerMock = vi.fn();

    const mapStub: Partial<LeafletMap> = {
      removeLayer: removeLayerMock,
    };

    useMapMock.mockReturnValue(mapStub as LeafletMap);

    const offers = [makeOffer('1'), makeOffer('2')];

    const { unmount } = render(
      <Map city={makeCity()} offers={offers} activeOfferId="2" />
    );

    expect(leafletMocks.layerGroupMock).toHaveBeenCalledTimes(1);
    expect(leafletMocks.addToMock).toHaveBeenCalledTimes(1);

    expect(leafletMocks.MarkerMock).toHaveBeenCalledTimes(2);
    expect(leafletMocks.markerSetIconMock).toHaveBeenCalledTimes(2);
    expect(leafletMocks.markerAddToMock).toHaveBeenCalledTimes(2);

    unmount();
    expect(removeLayerMock).toHaveBeenCalledTimes(1);
  });
});
