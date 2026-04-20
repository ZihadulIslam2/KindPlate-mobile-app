import { useState } from 'react'
import { useRouter } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createFoodPost } from '../lib/food'

export default function PostFoodScreen() {
  const router = useRouter()

  const [plateTitle, setPlateTitle] = useState('')
  const [foodType, setFoodType] = useState('')
  const [quantity, setQuantity] = useState('')
  const [weight, setWeight] = useState('')
  const [expiryTime, setExpiryTime] = useState('')
  const [address, setAddress] = useState('')
  const [image, setImage] = useState<null | {
    uri: string
    name: string
    type: string
  }>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (!permission.granted) {
      Alert.alert('Permission needed', 'Please allow access to your photos.')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.8,
      allowsEditing: true,
      aspect: [4, 3],
    })

    if (result.canceled || !result.assets[0]) {
      return
    }

    const asset = result.assets[0]
    const extension = asset.uri.split('.').pop() || 'jpg'

    setImage({
      uri: asset.uri,
      name: `food-${Date.now()}.${extension}`,
      type: asset.mimeType || `image/${extension}`,
    })
  }

  const handleSubmit = async () => {
    setError('')

    if (
      !plateTitle.trim() ||
      !foodType.trim() ||
      !expiryTime.trim() ||
      !address.trim()
    ) {
      setError('Please fill plate title, food type, expiry time, and address.')
      return
    }

    const parsedExpiry = new Date(expiryTime)

    if (Number.isNaN(parsedExpiry.getTime())) {
      setError('Please provide a valid expiry time (YYYY-MM-DD HH:mm).')
      return
    }

    try {
      setLoading(true)

      await createFoodPost({
        plateTitle: plateTitle.trim(),
        foodType: foodType.trim(),
        quantity: quantity.trim(),
        weight: weight.trim(),
        expiryTime: parsedExpiry.toISOString(),
        address: address.trim(),
        image: image ?? undefined,
      })

      Alert.alert('Shared', 'Your food post is now shared with the community.')
      router.replace('/')
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Unable to share food',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Post food</Text>
          <Text style={styles.subtitle}>
            Share extra food with your community.
          </Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Plate title</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Fresh cooked khichuri"
              placeholderTextColor="#94A19A"
              value={plateTitle}
              onChangeText={setPlateTitle}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Food type</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Cooked meal, Bakery, Fruits"
              placeholderTextColor="#94A19A"
              value={foodType}
              onChangeText={setFoodType}
            />
          </View>

          <View style={styles.doubleRow}>
            <View style={styles.doubleField}>
              <Text style={styles.label}>Quantity (optional)</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. 3 boxes"
                placeholderTextColor="#94A19A"
                value={quantity}
                onChangeText={setQuantity}
              />
            </View>

            <View style={styles.doubleField}>
              <Text style={styles.label}>Weight (optional)</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. 1.5 kg"
                placeholderTextColor="#94A19A"
                value={weight}
                onChangeText={setWeight}
              />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Expiry time</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD HH:mm"
              placeholderTextColor="#94A19A"
              value={expiryTime}
              onChangeText={setExpiryTime}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Your pickup address"
              placeholderTextColor="#94A19A"
              value={address}
              onChangeText={setAddress}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Add food image</Text>
            <Pressable
              style={({ pressed }) => [
                styles.uploadButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={pickImage}
            >
              <Text style={styles.uploadButtonText}>
                {image ? 'Change image' : 'Upload image'}
              </Text>
            </Pressable>
            {image ? (
              <Image source={{ uri: image.uri }} style={styles.previewImage} />
            ) : null}
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Pressable
            style={({ pressed }) => [
              styles.submitButton,
              pressed && !loading && styles.buttonPressed,
              loading && styles.submitDisabled,
            ]}
            disabled={loading}
            onPress={handleSubmit}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.submitButtonText}>Share with community</Text>
            )}
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F6F1',
  },
  flex: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 18,
    gap: 14,
  },
  title: {
    color: '#163B2D',
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    color: '#5F6A64',
    fontSize: 14,
    marginBottom: 8,
  },
  fieldGroup: {
    gap: 8,
  },
  label: {
    color: '#163B2D',
    fontSize: 13,
    fontWeight: '700',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: 'rgba(22, 59, 45, 0.14)',
    borderWidth: 1,
    borderRadius: 14,
    color: '#133024',
    fontSize: 15,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  doubleRow: {
    flexDirection: 'row',
    gap: 10,
  },
  doubleField: {
    flex: 1,
    gap: 8,
  },
  uploadButton: {
    backgroundColor: '#163B2D',
    borderRadius: 12,
    minHeight: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  previewImage: {
    marginTop: 8,
    width: '100%',
    height: 180,
    borderRadius: 14,
  },
  errorText: {
    color: '#B42318',
    fontSize: 13,
    lineHeight: 18,
  },
  submitButton: {
    backgroundColor: '#163B2D',
    borderRadius: 16,
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  submitDisabled: {
    opacity: 0.7,
  },
  buttonPressed: {
    opacity: 0.9,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
})
