'use client'

import { useEffect } from 'react'
import 'leaflet/dist/leaflet.css'
import { CircleMarker, MapContainer, Polyline, TileLayer, Tooltip, useMap } from 'react-leaflet'
import { categoryColors, hijraRoute, type Place } from '@/lib/data/places'

type Props = {
  places: Place[]
  selectedId: string | null
  showHijra: boolean
  focus: { center: [number, number]; zoom: number }
  onSelect: (id: string) => void
}

function FlyTo({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap()
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.2 })
  }, [map, center, zoom])
  return null
}

export default function SiraMap({ places, selectedId, showHijra, focus, onSelect }: Props) {
  return (
    <MapContainer
      center={focus.center}
      zoom={focus.zoom}
      scrollWheelZoom={false}
      className="size-full"
      attributionControl
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FlyTo center={focus.center} zoom={focus.zoom} />

      {showHijra && (
        <>
          <Polyline
            positions={hijraRoute.map((s) => s.coords)}
            pathOptions={{ color: '#b8862b', weight: 4, dashArray: '8 8' }}
          />
          {hijraRoute.map((stop) => (
            <CircleMarker
              key={stop.name}
              center={stop.coords}
              radius={4}
              pathOptions={{ color: '#b8862b', fillColor: '#fdfaf4', fillOpacity: 1, weight: 2 }}
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
            key={place.id}
            center={place.coords}
            radius={isSelected ? 11 : 7}
            pathOptions={{
              color: '#fdfaf4',
              weight: 2,
              fillColor: categoryColors[place.category],
              fillOpacity: 0.95,
            }}
            eventHandlers={{ click: () => onSelect(place.id) }}
          >
            <Tooltip direction="top" permanent={isSelected}>
              {place.name}
            </Tooltip>
          </CircleMarker>
        )
      })}
    </MapContainer>
  )
}
