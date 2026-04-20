import {
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const features = [
  {
    title: 'Share surplus',
    description: 'Turn extra food into meaningful support.',
  },
  {
    title: 'Simple pickup',
    description: 'Make donations and requests effortless.',
  },
]

export default function Index() {
  const router = useRouter()

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={styles.safeArea.backgroundColor}
      />
      <View style={styles.container}>
        <View style={styles.decorTop} />
        <View style={styles.decorBottom} />

        <View style={styles.brandRow}>
          <View style={styles.brandPill}>
            <Text style={styles.brandPillText}>KindPlate</Text>
          </View>
          <Text style={styles.brandTagline}>Food sharing with care</Text>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroGlow} />
          <View style={styles.logoCircle}>
            <Image
              source={require('../../assets/images/splash-icon.png')}
              resizeMode="contain"
              style={styles.logo}
            />
          </View>
        </View>

        <View style={styles.copyBlock}>
          <Text style={styles.title}>Welcome to KindPlate</Text>
          <Text style={styles.subtitle}>
            A clean, community-first food sharing experience designed to make
            every plate count.
          </Text>
        </View>

        <View style={styles.featureList}>
          {features.map((feature) => (
            <View key={feature.title} style={styles.featureCard}>
              <View style={styles.featureDot} />
              <View style={styles.featureTextGroup}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.actionRow}>
          <Pressable
            onPress={() => router.push('/register')}
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.primaryButtonText}>Get started</Text>
          </Pressable>
          <Pressable
            onPress={() => router.push('/login')}
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.secondaryButtonText}>Explore</Text>
          </Pressable>
        </View>

        <Text style={styles.footerText}>
          Together, we reduce waste and share better.
        </Text>
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
    paddingBottom: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  decorTop: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(132, 201, 139, 0.16)',
  },
  decorBottom: {
    position: 'absolute',
    bottom: 28,
    left: -50,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(47, 133, 90, 0.08)',
  },
  brandRow: {
    width: '100%',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },
  brandPill: {
    backgroundColor: '#163B2D',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
  },
  brandPillText: {
    color: '#F9FBF7',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  brandTagline: {
    color: '#55615A',
    fontSize: 13,
    letterSpacing: 0.5,
  },
  heroCard: {
    width: '100%',
    minHeight: 270,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroGlow: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    shadowColor: '#1F2937',
    shadowOpacity: 0.08,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 16 },
    elevation: 6,
  },
  logoCircle: {
    width: 210,
    height: 210,
    borderRadius: 105,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#111827',
    shadowOpacity: 0.12,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 12 },
    elevation: 10,
  },
  logo: {
    width: 170,
    height: 170,
  },
  copyBlock: {
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 6,
  },
  title: {
    color: '#133024',
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    color: '#5F6A64',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  featureList: {
    width: '100%',
    gap: 12,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: 'rgba(20, 48, 36, 0.06)',
  },
  featureDot: {
    width: 12,
    height: 12,
    marginTop: 5,
    borderRadius: 6,
    backgroundColor: '#84C98B',
  },
  featureTextGroup: {
    flex: 1,
    gap: 4,
  },
  featureTitle: {
    color: '#163B2D',
    fontSize: 15,
    fontWeight: '700',
  },
  featureDescription: {
    color: '#66716B',
    fontSize: 13,
    lineHeight: 18,
  },
  actionRow: {
    width: '100%',
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#163B2D',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: 'rgba(22, 59, 45, 0.08)',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  secondaryButtonText: {
    color: '#163B2D',
    fontSize: 15,
    fontWeight: '700',
  },
  buttonPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },
  footerText: {
    color: '#7A847E',
    fontSize: 12,
    textAlign: 'center',
    marginTop: -4,
  },
})
