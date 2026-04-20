import { useState } from 'react'
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from 'react-native'
import { useRouter } from 'expo-router'
import { AuthScreen } from '../components/auth-screen'
import { login } from '../lib/auth'

export default function LoginScreen() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async () => {
    setError('')

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.')
      return
    }

    try {
      setLoading(true)
      const session = await login(email.trim(), password)
      Alert.alert('Welcome back', `Signed in as ${session.user.fullName}`)
      router.replace('/')
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthScreen
      title="Sign in to your account"
      subtitle="Use your email address and password to continue."
      footerLabel="Need an account?"
      footerActionLabel="Create one"
      onFooterPress={() => router.push('/register')}
    >
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
          placeholder="Enter your password"
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
        onPress={handleLogin}
        style={({ pressed }) => [
          styles.button,
          pressed && !loading && styles.buttonPressed,
          loading && styles.buttonDisabled,
        ]}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
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
