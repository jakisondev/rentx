import React, { useState, useEffect } from 'react';

import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';

import { AntDesign } from '@expo/vector-icons';

import { StatusBar, FlatList } from 'react-native';
import { BackButton } from '../../components/BackButton';

import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitile,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles';

import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}
export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const navigation = useNavigation();
  const theme = useTheme();

  function handleBack() {
    navigation.goBack();
  }
  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get(`schedules_byuser?user_id=${1}`);
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);
  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />

        <BackButton
          onPress={handleBack}
          color={theme.colors.shape}
        />

        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>

        <SubTitle>
          Conforto e segurança
        </SubTitle>
      </Header>
      {loading
        ? <LoadAnimation />
        :
        <Content>
          <Appointments>
            <AppointmentsTitile>AgendamentosFeitos</AppointmentsTitile>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={cars}
            keyExtractor={item => item.car.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />

        </Content>
      }
    </Container>
  );
}