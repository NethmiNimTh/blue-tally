import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { plantApi } from '../../api/plantapi';
import { natureApi } from '../../api/natureApi';
import { animalApi } from '../../api/animalApi';

// component
const PhotoInformation = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { observationData, observationType } = route.params || {};
    const [currentLanguage, setCurrentLanguage] = useState('en');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [contactInfo, setContactInfo] = useState('');
    const [canUsePhoto, setCanUsePhoto] = useState('Yes');
    const [photoCredit, setPhotoCredit] = useState('');

    // Translation object
    const translations = {
        en: {
            headerTitle: 'Photo Information',
            sectionTitle: 'Photo Credits Information',
            infoText: 'If you wish to know more about your uploaded photo, please leave your contact details.',
            contactLabel: 'Mobile number or email (optional)',
            contactPlaceholder: 'Your contact information',
            helperText: 'This information will be shared with the admin.',
            permissionQuestion: 'Please indicate whether we can use this photo:',
            yes: 'Yes',
            no: 'No',
            photoCreditLabel: 'Photo credit:',
            photoCreditPlaceholder: 'How should we credit this photo?',
            submit: 'Submit',
            success: 'Success',
            submissionSuccess: 'Photo information saved successfully!',
            submissionFailed: 'Submission Failed',
            tryAgain: 'Please try again later.'
        },
        si: {
            headerTitle: 'ඡායාරූපය පිළිබද තොරතුරු',
            sectionTitle: 'ඡායාරූපයේ හිමිකාරීත්වය සඳහා තොරතුරු',
            infoText: 'ඔබ ලබා දුන් ඡායාරූපය පිළිබඳ වැඩිදුර තොරතුරු අවශ්‍යය නම් පහත තොරතුරු ලබා දෙන්න.',
            contactLabel: 'දුරකථන අංකය / විද්‍යුත් තැපැල් ලිපිනය',
            contactPlaceholder: 'ඔබව සම්බන්ධ කර ගත හැකි විස්තර',
            helperText: 'මෙම තොරතුරු පරිපාලක සමග හුවමාරු වීම සිදුවේ.',
            permissionQuestion: 'ඔබගේ ඡායාරූපය අප හට භාවිතා කිරීමට අවසර ලබා දෙන්නේ ද ? ',
            yes: 'ඔව්',
            no: 'නැත',
            photoCreditLabel: 'ඡායාරූපයේ හිමිකාරීත්වය:',
            photoCreditPlaceholder: 'ඡායාරූපයේ හිමිකාරිත්වය සඳහන් විය යුතු ආකාරය පහත දක්වන්න?',
            submit: 'දත්ත ඇතුලත් කිරීම තහවුරු කරන්න',
            success: 'සාර්ථකයි',
            submissionSuccess: 'ඡායාරූප තොරතුරු සාර්ථකව සුරකින ලදී!',
            submissionFailed: 'ඉදිරිපත් කිරීම අසාර්ථකයි',
            tryAgain: 'කරුණාකර පසුව නැවත උත්සාහ කරන්න.'
        },
        ta: {
            headerTitle: 'புகைப்பட தகவல்',
            sectionTitle: 'புகைப்பட வரவுகள் தகவல்',
            infoText: 'நீங்கள் பதிவேற்றிய புகைப்படத்தைப் பற்றி மேலும் அறிய விரும்பினால், உங்கள் தொடர்பு விவரங்களை விட்டுவிடுங்கள்.',
            contactLabel: 'மொபைல் எண் அல்லது மின்னஞ்சல் (விருப்பமானது)',
            contactPlaceholder: 'உங்கள் தொடர்பு தகவல்',
            helperText: 'இந்தத் தகவல் நிர்வாகியுடன் பகிரப்படும்.',
            permissionQuestion: 'இந்த புகைப்படத்தை நாங்கள் பயன்படுத்தலாமா என்பதைக் குறிப்பிடுங்கள்:',
            yes: 'ஆம்',
            no: 'இல்லை',
            photoCreditLabel: 'புகைப்பட வரவு:',
            photoCreditPlaceholder: 'இந்த புகைப்படத்தை எவ்வாறு வரவு வைக்க வேண்டும்?',
            submit: 'சமர்ப்பிக்கவும்',
            success: 'வெற்றி',
            submissionSuccess: 'புகைப்பட தகவல் வெற்றிகரமாக சேமிக்கப்பட்டது!',
            submissionFailed: 'சமர்ப்பிப்பு தோல்வியடைந்தது',
            tryAgain: 'பின்னர் மீண்டும் முயற்சிக்கவும்.'
        }
    };

    // Load saved language preference
    useEffect(() => {
        loadLanguage();
    }, []);

    const loadLanguage = async () => {
        try {
            const savedLanguage = await AsyncStorage.getItem('userLanguage');
            if (savedLanguage) {
                setCurrentLanguage(savedLanguage);
            }
        } catch (error) {
            console.error('Error loading language:', error);
        }
    };

    // Get current translations
    const t = translations[currentLanguage] || translations.en;

    const handleSubmit = async () => {
        setIsSubmitting(true);

        try {
            const photoInfo = {
                contactInfo: contactInfo.trim() || undefined,
                canUsePhoto: canUsePhoto === 'Yes',
                photoCredit: photoCredit.trim() || undefined
            };

            console.log('Submitting photo information:', photoInfo);
            console.log('Observation type:', observationType);

            // Get the observation ID
            const observationId = observationData?._id || observationData?.id;

            if (observationId) {
                // Call the appropriate API based on observation type
                switch (observationType) {
                    case 'plant':
                        await plantApi.updatePlantPhotoInfo(observationId, photoInfo);
                        break;
                    case 'nature':
                        await natureApi.updateNaturePhotoInfo(observationId, photoInfo);
                        break;
                    case 'animal':
                        await animalApi.updateAnimalPhotoInfo(observationId, photoInfo);
                        break;
                    case 'humanActivity':
                        // Human activity doesn't have a backend yet, just log
                        console.log('Human activity photo info (no backend):', photoInfo);
                        break;
                    default:
                        console.log('Unknown observation type:', observationType);
                }
            }

            Alert.alert(
                t.success,
                t.submissionSuccess,
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            // Navigate to CitizenDashboard
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'CitizenDashboard' }],
                            });
                        },
                    },
                ]
            );
        } catch (error) {
            console.error('Error submitting photo information:', error);
            Alert.alert(
                t.submissionFailed,
                error.message || t.tryAgain
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>{t.headerTitle}</Text>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.formContainer}>
                    <Text style={styles.sectionTitle}>{t.sectionTitle}</Text>

                    <Text style={styles.infoText}>
                        {t.infoText}
                    </Text>

                    {/* Contact Information Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>{t.contactLabel}</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder={t.contactPlaceholder}
                            placeholderTextColor="#AAA"
                            value={contactInfo}
                            onChangeText={setContactInfo}
                        />
                        <Text style={styles.helperText}>
                            {t.helperText}
                        </Text>
                    </View>

                    {/* Photo Credit Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>{t.photoCreditLabel}</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder={t.photoCreditPlaceholder}
                            placeholderTextColor="#AAA"
                            value={photoCredit}
                            onChangeText={setPhotoCredit}
                        />
                    </View>

                    {/* Permission Section */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.questionText}>
                            {t.permissionQuestion}
                        </Text>

                        <View style={styles.radioGroup}>
                            <TouchableOpacity
                                style={styles.radioOption}
                                onPress={() => setCanUsePhoto('Yes')}
                                activeOpacity={0.7}
                            >
                                <View style={styles.radioButton}>
                                    {canUsePhoto === 'Yes' && <View style={styles.radioButtonSelected} />}
                                </View>
                                <Text style={styles.radioLabel}>{t.yes}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.radioOption}
                                onPress={() => setCanUsePhoto('No')}
                                activeOpacity={0.7}
                            >
                                <View style={styles.radioButton}>
                                    {canUsePhoto === 'No' && <View style={styles.radioButtonSelected} />}
                                </View>
                                <Text style={styles.radioLabel}>{t.no}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Submit Button */}
                    <TouchableOpacity
                        style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
                        onPress={handleSubmit}
                        activeOpacity={0.8}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <Text style={styles.submitButtonText}>{t.submit}</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

// styles
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        flexGrow: 1,
    },
    buttonContainer: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#FFFFFF',
    },
    header: {
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: '#4A7856',
    },
    headerTitle: {
        fontSize: 24,
        fontFamily: 'Times New Roman',
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    formContainer: {
        paddingHorizontal: 20,
        paddingTop: 30,
        backgroundColor: '#FFFFFF',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 25,
        fontFamily: 'Times New Roman',
    },
    infoText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        marginBottom: 50,
        fontFamily: 'Times New Roman',
    },
    inputGroup: {
        marginBottom: 20,
    },
    inputGroupLast: {
        marginBottom: 5,
    },
    label: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
        fontFamily: 'Times New Roman',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 15,
        color: '#333',
        backgroundColor: '#FAFAFA',
        fontFamily: 'Times New Roman',
        textAlign: 'center',
    },
    helperText: {
        fontSize: 12,
        color: '#999',
        marginTop: 6,
        marginBottom: 30,
        fontFamily: 'Times New Roman',
    },
    questionText: {
        fontSize: 15,
        color: '#666',
        marginBottom: 30,
        fontWeight: '500',
        fontFamily: 'Times New Roman',
    },
    radioGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 40,
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioButton: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: '#4A7856',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        marginBottom: 50,
    },
    radioButtonSelected: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#4A7856',
    },
    radioLabel: {
        fontSize: 15,
        color: '#333',
        fontFamily: 'Times New Roman',
    },
    submitButton: {
        backgroundColor: '#4A7856',
        borderRadius: 10,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    submitButtonText: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontFamily: 'Times New Roman',
    },
    submitButtonDisabled: {
        backgroundColor: '#8AAB91',
    },
});

export default PhotoInformation;