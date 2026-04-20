import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const quickActions = [
  { label: 'Donate food', tone: 'green' as const },
  { label: 'Find meals', tone: 'amber' as const },
  { label: 'My requests', tone: 'blue' as const },
]

const nearbyItems = [
  {
    id: 'item-1',
    title: 'Vegetable biryani meal box',
    description: 'Freshly cooked, serves 2 people, packed 30 mins ago.',
    foodType: 'Cooked meal',
    distanceKm: 1.2,
    imageUrl:
      'https://images.unsplash.com/photo-1701579231340-3a5ce9106ec9?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'item-2',
    title: 'Bakery bread and buns pack',
    description: 'Same-day baked items, sealed and ready for pickup.',
    foodType: 'Bakery',
    distanceKm: 2.4,
    imageUrl:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'item-3',
    title: 'Seasonal fruit basket',
    description: 'Mixed ripe fruits. Best for family sharing tonight.',
    foodType: 'Fruits',
    distanceKm: 0.9,
    imageUrl:
      'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=900&q=80',
  },
]

export default function HomeScreen() {
  const router = useRouter()

  const greeting = 'Good afternoon'

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroBackdrop} />
        <View style={styles.heroBackdropAccent} />

        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greeting}>{greeting},</Text>
            <Text style={styles.title}>Welcome to KindPlate</Text>
          </View>

          <View style={styles.profileChip}>
            <Text style={styles.profileInitial}>K</Text>
          </View>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroTextBlock}>
            <Text style={styles.heroLabel}>Today’s impact</Text>
            <Text style={styles.heroStat}>34 meals shared</Text>
            <Text style={styles.heroDescription}>
              Help reduce food waste by sharing surplus meals with people who
              need them most.
            </Text>
          </View>

          <View style={styles.heroIllustrationWrap}>
            <View style={styles.heroGlow} />
            <View style={styles.heroIllustrationCircle}>
              <Image
                source={require('../../assets/logo.png')}
                resizeMode="contain"
                style={styles.heroIllustration}
              />
            </View>
          </View>
        </View>

        <View style={styles.actionGrid}>
          {quickActions.map((item) => (
            <Pressable
              key={item.label}
              style={({ pressed }) => [
                styles.actionCard,
                styles[`action${item.tone}`],
                pressed && styles.pressed,
              ]}
              onPress={() => router.push('/register')}
            >
              <View style={[styles.actionDot, styles[`dot${item.tone}`]]} />
              <Text style={styles.actionLabel}>{item.label}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby opportunities</Text>
          <Text style={styles.sectionLink}>View all</Text>
        </View>

        <View style={styles.listWrap}>
          {nearbyItems.map((item) => (
            <View key={item.id} style={styles.foodCard}>
              <Image source={{ uri: item.imageUrl }} style={styles.foodImage} />

              <View style={styles.foodCardBody}>
                <View style={styles.foodCardTopRow}>
                  <Text style={styles.foodTypeTag}>{item.foodType}</Text>
                  <View style={styles.distancePill}>
                    <Text style={styles.distanceText}>
                      📍 {item.distanceKm} km
                    </Text>
                  </View>
                </View>

                <Text style={styles.foodTitle}>{item.title}</Text>
                <Text style={styles.foodDescription}>{item.description}</Text>

                <Pressable
                  style={({ pressed }) => [
                    styles.reserveButton,
                    pressed && styles.pressed,
                  ]}
                  onPress={() =>
                    Alert.alert('Reserved', `${item.title} reserved.`)
                  }
                >
                  <Text style={styles.reserveButtonText}>Reserve now</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.featurePanel}>
          <View style={styles.featureBadge}>
            <Text style={styles.featureBadgeText}>Live</Text>
          </View>
          <Text style={styles.featurePanelTitle}>
            Save meals before they go to waste
          </Text>
          <Text style={styles.featurePanelText}>
            Connect with local donors, browse available food, and manage your
            requests in one simple place.
          </Text>
          <Pressable
            style={styles.primaryButton}
            onPress={() => router.push('/register')}
          >
            <Text style={styles.primaryButtonText}>Start sharing</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#101513',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 28,
    gap: 18,
    position: 'relative',
  },
  heroBackdrop: {
    position: 'absolute',
    top: -30,
    right: -60,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(132, 201, 139, 0.13)',
  },
  heroBackdropAccent: {
    position: 'absolute',
    top: 120,
    left: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  greeting: {
    color: '#AEB7B1',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  title: {
    color: '#F7F8F6',
    fontSize: 27,
    lineHeight: 32,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  profileChip: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1E2A23',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitial: {
    color: '#F7F8F6',
    fontSize: 18,
    fontWeight: '800',
  },
  heroCard: {
    backgroundColor: '#1A211E',
    borderRadius: 28,
    padding: 18,
    minHeight: 220,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  heroTextBlock: {
    width: '56%',
    gap: 8,
  },
  heroLabel: {
    color: '#9DB69C',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  heroStat: {
    color: '#FFFFFF',
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '800',
  },
  heroDescription: {
    color: '#BBC3BC',
    fontSize: 13,
    lineHeight: 19,
  },
  heroIllustrationWrap: {
    position: 'absolute',
    right: -12,
    top: 16,
    width: 190,
    height: 190,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroGlow: {
    position: 'absolute',
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: 'rgba(132, 201, 139, 0.12)',
  },
  heroIllustrationCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#F5F6F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroIllustration: {
    width: 128,
    height: 128,
  },
  actionGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    borderRadius: 20,
    padding: 14,
    gap: 10,
    minHeight: 92,
    borderWidth: 1,
  },
  actiongreen: {
    backgroundColor: '#16211B',
    borderColor: 'rgba(148, 201, 139, 0.18)',
  },
  actionamber: {
    backgroundColor: '#1F1B16',
    borderColor: 'rgba(220, 170, 103, 0.16)',
  },
  actionblue: {
    backgroundColor: '#171E22',
    borderColor: 'rgba(125, 176, 214, 0.16)',
  },
  actionDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  dotgreen: {
    backgroundColor: '#84C98B',
  },
  dotamber: {
    backgroundColor: '#DFA45A',
  },
  dotblue: {
    backgroundColor: '#79AEDD',
  },
  actionLabel: {
    color: '#F8FAF7',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: '#F7F8F6',
    fontSize: 18,
    fontWeight: '800',
  },
  sectionLink: {
    color: '#9DB69C',
    fontSize: 13,
    fontWeight: '700',
  },
  listWrap: {
    gap: 12,
  },
  foodCard: {
    backgroundColor: '#171C1A',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  foodImage: {
    width: '100%',
    height: 140,
  },
  foodCardBody: {
    padding: 14,
    gap: 10,
  },
  foodCardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  foodTypeTag: {
    color: '#163B2D',
    backgroundColor: '#DDF1E1',
    fontSize: 12,
    fontWeight: '800',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  distancePill: {
    backgroundColor: 'rgba(132, 201, 139, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  distanceText: {
    color: '#9DB69C',
    fontSize: 12,
    fontWeight: '700',
  },
  foodTitle: {
    color: '#F5F7F4',
    fontSize: 15,
    fontWeight: '700',
  },
  foodDescription: {
    color: '#AEB7B1',
    fontSize: 13,
    lineHeight: 18,
  },
  reserveButton: {
    marginTop: 2,
    alignSelf: 'flex-start',
    backgroundColor: '#163B2D',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  reserveButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  featurePanel: {
    backgroundColor: '#EAF3EA',
    borderRadius: 26,
    padding: 18,
    gap: 10,
  },
  featureBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#163B2D',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  featureBadgeText: {
    color: '#F5F7F4',
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  featurePanelTitle: {
    color: '#133024',
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '800',
  },
  featurePanelText: {
    color: '#51615B',
    fontSize: 13,
    lineHeight: 19,
  },
  primaryButton: {
    backgroundColor: '#163B2D',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    marginTop: 4,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
})
