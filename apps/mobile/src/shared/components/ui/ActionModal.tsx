import React, { useState } from 'react'
import {
  Modal,
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native'
import { BlurView } from 'expo-blur'
import * as ImagePicker from 'expo-image-picker'
import { Typography } from './Typography'
import { Button } from './Button'
import { useAppTheme } from '../../theme/ThemeProvider'
import { X, Weight, Utensils, Camera as CameraIcon, Image as ImageIcon } from 'lucide-react-native'
import { spacing } from '../../theme'

interface ActionModalProps {
  visible: boolean
  type: 'weight' | 'meal'
  onClose: () => void
  onSave: (value: string, details?: string) => void
}

export const ActionModal = ({ visible, type, onClose, onSave }: ActionModalProps) => {
  const { theme: colors, isDark } = useAppTheme()
  const styles = useStyles(colors)
  const [imageUri, setImageUri] = useState<string | null>(null)
  const [details, setDetails] = useState('')

  const isWeight = type === 'weight'
  const Icon = isWeight ? Weight : Utensils
  const title = isWeight ? 'Registrar Peso' : 'Registrar Refeição'

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync()
    if (!permission.granted) {
      Alert.alert('É necessário permitir o acesso à câmera.')
      return
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    })
    if (!result.canceled && result.assets) {
      setImageUri(result.assets[0].uri)
    }
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.8,
    })
    if (!result.canceled && result.assets) {
      setImageUri(result.assets[0].uri)
    }
  }

  const handleSave = () => {
    if (!imageUri) return
    onSave(imageUri, details)
    setImageUri(null)
    setDetails('')
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <BlurView
          intensity={isDark ? 40 : 20}
          tint={isDark ? 'dark' : 'light'}
          style={StyleSheet.absoluteFill}
        >
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        </BlurView>

        <View style={styles.contentContainer}>
          <View style={styles.modal}>
            <View style={styles.header}>
              <View style={styles.titleRow}>
                <Typography variant="h3" bold>
                  {title}
                </Typography>
              </View>
              <Pressable onPress={onClose} style={styles.closeButton}>
                <X color={colors.textMuted} size={24} />
              </Pressable>
            </View>

            <View style={styles.imagePickerContainer}>
              {imageUri ? (
                <View>
                  <Image source={{ uri: imageUri }} style={styles.imagePreview} />
                  <TouchableOpacity
                    style={styles.removeImageButton}
                    onPress={() => setImageUri(null)}
                  >
                    <X color="white" size={16} />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.imageButtonsRow}>
                  <TouchableOpacity style={styles.imageButton} onPress={takePhoto}>
                    <CameraIcon color={colors.primary} size={32} />
                    <Typography variant="label" color="primary" style={styles.imageButtonText}>
                      Câmera
                    </Typography>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
                    <ImageIcon color={colors.textMuted} size={32} />
                    <Typography variant="label" color="textMuted" style={styles.imageButtonText}>
                      Galeria
                    </Typography>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Typography variant="label" color="textMuted">
                Descrição (Opcional)
              </Typography>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={details}
                onChangeText={setDetails}
                placeholder="O que você comeu?"
                placeholderTextColor={colors.textMuted}
                multiline
              />
            </View>

            <View style={styles.footer}>
              <Button
                title="Cancelar"
                variant="outline"
                onPress={onClose}
                style={styles.flexItem}
              />
              <View style={styles.spacer} />
              <Button title="Salvar" onPress={handleSave} style={styles.flexItem} />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  )
}

const useStyles = (colors: any) =>
  StyleSheet.create({
    keyboardContainer: {
      flex: 1,
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
      padding: spacing.md,
      position: 'absolute',
      bottom: 0,
      width: '100%',
    },
    modal: {
      backgroundColor: colors.surface,
      borderRadius: 24,
      padding: spacing.lg,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.25,
      shadowRadius: 20,
      elevation: 10,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.xl,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    closeButton: {
      padding: spacing.sm,
      marginRight: -spacing.sm,
    },
    inputGroup: {
      marginBottom: spacing.lg,
    },
    input: {
      backgroundColor: colors.background,
      color: colors.text,
      borderRadius: 12,
      padding: spacing.md,
      fontSize: 18,
      marginTop: spacing.sm,
      borderWidth: 1,
      borderColor: colors.border,
    },
    imagePickerContainer: {
      marginBottom: spacing.lg,
      alignItems: 'center',
    },
    imagePreview: {
      width: 200,
      height: 200,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    removeImageButton: {
      position: 'absolute',
      top: -10,
      right: -10,
      backgroundColor: colors.error,
      width: 28,
      height: 28,
      borderRadius: 14,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 4,
    },
    imageButtonsRow: {
      flexDirection: 'row',
      gap: spacing.lg,
    },
    imageButton: {
      width: 100,
      height: 100,
      borderRadius: 16,
      borderWidth: 2,
      borderColor: colors.border,
      borderStyle: 'dashed',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.02)',
    },
    imageButtonText: {
      marginTop: spacing.sm,
    },
    textArea: {
      height: 80,
      fontSize: 16,
      paddingTop: spacing.md,
    },
    footer: {
      flexDirection: 'row',
      marginTop: spacing.sm,
    },
    flexItem: {
      flex: 1,
    },
    spacer: {
      width: spacing.md,
    },
  })
