import { useMemo, type ReactNode } from 'react'
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type AuthScreenProps = Readonly<{
  title: string
  subtitle: string
  footerLabel: string
  footerActionLabel: string
  onFooterPress: () => void
  children: ReactNode
}>

export function AuthScreen({
  title,
  subtitle,
  footerLabel,
  footerActionLabel,
  onFooterPress,
  children,
}: AuthScreenProps) {
  const keyboardBehavior = useMemo(
    () => (Platform.OS === 'ios' ? 'padding' : 'height'),
    [],
  )

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F6F1" />
      <KeyboardAvoidingView style={styles.flex} behavior={keyboardBehavior}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.decorTop} />
          <View style={styles.decorBottom} />

          <View style={styles.header}>
            <View style={styles.brandBadge}>
              <Image
                source={require('../../assets/logo.png')}
                style={styles.brandLogo}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.brandText}>KindPlate</Text>
          </View>

          <View style={styles.heroBlock}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>

          <View style={styles.card}>{children}</View>

          <View style={styles.footerRow}>
            <Text style={styles.footerLabel}>{footerLabel}</Text>
            <Pressable onPress={onFooterPress}>
              <Text style={styles.footerAction}>{footerActionLabel}</Text>
            </Pressable>
          </View>
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 24,
    justifyContent: 'center',
    gap: 20,
    overflow: 'hidden',
  },
  decorTop: {
    position: 'absolute',
    top: -30,
    right: -40,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(132, 201, 139, 0.14)',
  },
  decorBottom: {
    position: 'absolute',
    bottom: 20,
    left: -50,
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: 'rgba(22, 59, 45, 0.06)',
  },
  header: {
    alignItems: 'center',
    gap: 10,
  },
  brandBadge: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#111827',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  brandLogo: {
    width: 62,
    height: 62,
  },
  brandText: {
    color: '#163B2D',
    fontSize: 28,
    lineHeight: 32,
    fontWeight: '800',
    letterSpacing: -0.4,
  },
  heroBlock: {
    alignItems: 'center',
    gap: 8,
  },
  title: {
    color: '#133024',
    fontSize: 26,
    lineHeight: 31,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    color: '#5F6A64',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(20, 48, 36, 0.06)',
    shadowColor: '#111827',
    shadowOpacity: 0.06,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 3,
    gap: 14,
  },
  footerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 6,
  },
  footerLabel: {
    color: '#66716B',
    fontSize: 13,
  },
  footerAction: {
    color: '#163B2D',
    fontSize: 13,
    fontWeight: '700',
  },
})
