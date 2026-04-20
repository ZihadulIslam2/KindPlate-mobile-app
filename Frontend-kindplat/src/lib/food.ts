import { Platform } from 'react-native'

export type FoodPostItem = {
  id: string
  plateTitle: string
  foodType: string
  quantity?: string
  weight?: string
  expiryTime: string
  address: string
  imageUrl?: string
  distanceKm: number
  createdAt?: string
  updatedAt?: string
}

type ApiEnvelope<T> = {
  statusCode?: number
  message?: string
  data?: T
}

type NestedApiResponse<T> = ApiEnvelope<T | ApiEnvelope<T>>

const DEFAULT_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ??
  (Platform.OS === 'android' ? 'http://10.0.2.2:5000' : 'http://localhost:5000')

function normalizeResponseData<T>(payload: NestedApiResponse<T>): T {
  const normalizedData = payload.data

  if (
    normalizedData &&
    typeof normalizedData === 'object' &&
    'data' in normalizedData &&
    normalizedData.data
  ) {
    return normalizedData.data
  }

  return (normalizedData ?? payload) as T
}

export async function fetchNearbyFoods() {
  const response = await fetch(`${DEFAULT_BASE_URL}/food`)
  const payload = (await response.json()) as NestedApiResponse<FoodPostItem[]>

  if (!response.ok) {
    throw new Error(payload.message ?? 'Failed to fetch food posts')
  }

  return normalizeResponseData<FoodPostItem[]>(payload)
}

export type CreateFoodPayload = {
  plateTitle: string
  foodType: string
  quantity?: string
  weight?: string
  expiryTime: string
  address: string
  image?: {
    uri: string
    name: string
    type: string
  }
}

export async function createFoodPost(payload: CreateFoodPayload) {
  const formData = new FormData()

  formData.append('plateTitle', payload.plateTitle)
  formData.append('foodType', payload.foodType)
  formData.append('expiryTime', payload.expiryTime)
  formData.append('address', payload.address)

  if (payload.quantity?.trim()) {
    formData.append('quantity', payload.quantity.trim())
  }

  if (payload.weight?.trim()) {
    formData.append('weight', payload.weight.trim())
  }

  if (payload.image) {
    if (Platform.OS === 'web') {
      const fileResponse = await fetch(payload.image.uri)
      const blob = await fileResponse.blob()
      formData.append('image', blob, payload.image.name)
    } else {
      ;(formData as any).append('image', payload.image)
    }
  }

  const response = await fetch(`${DEFAULT_BASE_URL}/food`, {
    method: 'POST',
    body: formData,
  })

  const payloadResponse =
    (await response.json()) as NestedApiResponse<FoodPostItem>

  if (!response.ok) {
    throw new Error(payloadResponse.message ?? 'Failed to share food')
  }

  return normalizeResponseData<FoodPostItem>(payloadResponse)
}
