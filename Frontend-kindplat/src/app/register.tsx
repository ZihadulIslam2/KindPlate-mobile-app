import { useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { useRouter } from 'expo-router'
import { AuthScreen } from '../components/auth-screen'
import { register } from '../lib/auth'

export default function RegisterScreen() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleRegister = async () => {
    setError('')

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in your full name, email, and password.')
      return
    }

    try {
      setLoading(true)
      const session = await register(fullName.trim(), email.trim(), password)
      Alert.alert('Account created', `Welcome, ${session.user.fullName}`)
      router.replace('/')
    } catch (authError) {
      setError(
        authError instanceof Error ? authError.message : 'Registration failed',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthScreen
      title="Create your KindPlate account"
      subtitle="Share food, reduce waste, and start helping your community."
      footerLabel="Already registered?"
      footerActionLabel="Sign in"
      onFooterPress={() => router.push('/login')}
    >
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Full name</Text>
        <TextInput
          autoCapitalize="words"
          placeholder="Your full name"
          placeholderTextColor="#94A19A"
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Email address</Text>
        <TextInput
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="you@example.com"
          placeholderTextColor="#94A19A"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Create a password"
          placeholderTextColor="#94A19A"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Pressable
        disabled={loading}
        onPress={handleRegister}
        style={({ pressed }) => [
          styles.button,
          pressed && !loading && styles.buttonPressed,
          loading && styles.buttonDisabled,
        ]}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Create account</Text>
        )}
      </Pressable>
    </AuthScreen>
  )
}

const styles = StyleSheet.create({
  fieldGroup: {
    gap: 8,
  },
  label: {
    color: '#163B2D',
    fontSize: 13,
    fontWeight: '700',
  },
  input: {
    backgroundColor: '#F7F8F6',
    borderColor: 'rgba(22, 59, 45, 0.12)',
    borderRadius: 16,
    borderWidth: 1,
    color: '#133024',
    fontSize: 15,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  errorText: {
    color: '#B42318',
    fontSize: 13,
    lineHeight: 18,
  },
  button: {
    backgroundColor: '#163B2D',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  buttonPressed: {
    opacity: 0.9,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
})