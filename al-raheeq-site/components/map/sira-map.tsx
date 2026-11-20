'use client'

import { useEffect } from 'react'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { CircleMarker, MapContainer, Marker, Polyline, TileLayer, Tooltip, useMap } from 'react-leaflet'
import { categoryColors, hijraRoute, historicalLabels, type Place } from '@/lib/data/places'

export type Era = 'then' | 'now'

type Props = {
  places: Place[]
  selectedId: string | null
  showHijra: boolean
  era: Era
  focus: { center: [number, number]; zoom: number }
  onSelect: (id: string) => void
}

const HISTORICAL_MAX_ZOOM = 14

const tiles: Record<Era, { url: string; attribution: string; maxNativeZoom: number }> = {
  now: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxNativeZoom: 19,
  },
  then: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri',
    maxNativeZoom: 13,
  },
}

function FlyTo({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap()
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.2 })
  }, [map, center, zoom])
  return null
}

export default function SiraMap({ places, selectedId, showHijra, era, focus, onSelect }: Props) {
  const zoom = era === 'then' ? Math.min(focus.zoom, HISTORICAL_MAX_ZOOM) : focus.zoom
  const tile = tiles[era]
  const routeColor = era === 'then' ? '#7a4f1d' : '#b48a3c'

  return (
    <MapContainer center={focus.center} zoom={zoom} scrollWheelZoom={false} className="size-full" attributionControl>
      <TileLayer
        key={era}
        attribution={tile.attribution}
        url={tile.url}
        maxNativeZoom={tile.maxNativeZoom}
        maxZoom={era === 'then' ? HISTORICAL_MAX_ZOOM : 19}
      />
      <FlyTo center={focus.center} zoom={zoom} />

      {era === 'then' &&
        historicalLabels.map((label) => (
          <Marker
            key={label.name}
            position={label.coords}
            interactive={false}
            icon={L.divIcon({ className: 'map-era-label', html: label.name, iconSize: undefined })}
          />
        ))}

      {showHijra && (
        <>
          <Polyline
            positions={hijraRoute.map((s) => s.coords)}
            pathOptions={{ color: routeColor, weight: 4, dashArray: '8 8' }}
          />
          {hijraRoute.map((stop) => (
            <CircleMarker
              key={stop.name}
              center={stop.coords}
              radius={4}
              pathOptions={{ color: routeColor, fillColor: '#fbf8f1', fillOpacity: 1, weight: 2 }}
            >
              <Tooltip direction="top">{stop.name}</Tooltip>
            </CircleMarker>
          ))}
        </>
      )}

      {places.map((place) => {
        const isSelected = place.id === selectedId
        return (
          <CircleMarker
            key={`${era}-${place.id}`}
            center={place.coords}
            radius={isSelected ? 11 : 7}
            pathOptions={{
              color: era === 'then' ? '#f3e7cc' : '#fbf8f1',
              weight: 2,
              fillColor: categoryColors[place.category],
              fillOpacity: 0.95,
            }}
            eventHandlers={{ click: () => onSelect(place.id) }}
          >
            <Tooltip direction="top" permanent={isSelected}>
              {era === 'then' ? (place.oldName ?? place.name) : place.name}
            </Tooltip>
          </CircleMarker>
        )
      })}
    </MapContainer>
  )
}
