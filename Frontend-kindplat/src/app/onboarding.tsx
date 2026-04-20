import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function OnboardingScreen() {
  const router = useRouter()

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.container}>
        <View style={styles.imageWrap}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
            }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>
            Share the Love,{`\n`}Reduce the{`\n`}Waste
          </Text>

          <Text style={styles.subtitle}>
            Connect with neighbors to share{`\n`}surplus food and help those in
            {`\n`}need. Every plate matters.
          </Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={() => router.push('./post-food')}
        >
          <Text style={styles.buttonText}>Get start</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F6F1',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 26,
    justifyContent: 'space-between',
    gap: 20,
  },
  imageWrap: {
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#E8ECE7',
    minHeight: 330,
    shadowColor: '#111827',
    shadowOpacity: 0.1,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    gap: 14,
    alignItems: 'center',
  },
  title: {
    color: '#163B2D',
    fontSize: 42,
    lineHeight: 46,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: -0.6,
  },
  subtitle: {
    color: '#51615B',
    fontSize: 18,
    lineHeight: 26,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#163B2D',
    minHeight: 58,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    opacity: 0.92,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
    textTransform: 'lowercase',
  },
})
