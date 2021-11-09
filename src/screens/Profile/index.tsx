import React, { useState } from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';

import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/core';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useAuth } from '../../hooks/auth';

import { Feather } from '@expo/vector-icons';

import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import {
    Container,
    Header,
    HeaderTop,
    HeaderTitle,
    LogoutButton,
    PhotoContainer,
    Photo,
    PhotoButton,
    Content,
    Options,
    Option,
    OptionTitle,
    Section
} from './styles';

export function Profile() {
    const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');

    const theme = useTheme();
    const navigation = useNavigation();
    const { user } = useAuth();

    function handleBack() {
        navigation.goBack();
    }

    function handleSignOut() {
        navigation.goBack();
    }

    function handleOptionsChange(optionSelected: 'dataEdit' | 'passwordEdit') {
        setOption(optionSelected);
    }

    return (
        <KeyboardAvoidingView behavior="position" enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <HeaderTop>
                            <BackButton color={theme.colors.shape} onPress={handleBack} />
                            <HeaderTitle>Editar Perfil</HeaderTitle>
                            <LogoutButton onPress={handleSignOut} >
                                <Feather name="power" size={24} color={theme.colors.shape} />
                            </LogoutButton>
                        </HeaderTop>
                        <PhotoContainer>
                            <Photo source={{ uri: 'https://github.com/jakisondev.png' }} />
                            <PhotoButton onPress={() => { }}>
                                <Feather name="camera" size={24} color={theme.colors.shape} />
                            </PhotoButton>
                        </PhotoContainer>
                    </Header>
                    <Content style={{ marginBottom: useBottomTabBarHeight() }}>
                        <Options>
                            <Option active={option === 'dataEdit'} onPress={() => handleOptionsChange('dataEdit')}>
                                <OptionTitle active={option === 'dataEdit'}>Dados</OptionTitle>
                            </Option>
                            <Option active={option === 'passwordEdit'} onPress={() => handleOptionsChange('passwordEdit')}>
                                <OptionTitle active={option === 'passwordEdit'}>Trocar senha</OptionTitle>
                            </Option>
                        </Options>

                        {option === 'dataEdit'
                            ?
                            <Section>
                                <Input
                                    iconName="user"
                                    placeholder="Nome"
                                    autoCorrect={false}
                                    defaultValue={user.name}
                                />
                                <Input
                                    iconName="mail"
                                    editable={false}
                                    defaultValue={user.email
                                    } />
                                <Input
                                    iconName=
                                    "credit-card"
                                    placeholder="CNH"
                                    keyboardType="numeric"
                                    defaultValue={user.driver_license}
                                />
                            </Section>
                            :
                            <Section>
                                <PasswordInput iconName="lock" placeholder="Senha atual" />
                                <PasswordInput iconName="lock" placeholder="Nova senha" />
                                <PasswordInput iconName="lock" placeholder="Repetir senha" />
                            </Section>
                        }
                    </Content>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}