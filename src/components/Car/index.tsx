import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

import GasolineSvg from '../../assets/gasoline.svg';
import {
    Container,
    Details,
    Brand,
    Name,
    About,
    Rent,
    Period,
    Price,
    Type,
    CarImage
} from './styles';

interface CardData {
    brand: string;
    name: string;
    rent: {
        period: string;
        price: number;
    },
    thumbnail: string;
}

interface Props extends RectButtonProps {
    data: CardData;
}

export function Car({ data, ...rest }: Props) {
    return (
        <Container {...rest}>
            <Details>
                <Brand>{data.brand}</Brand>
                <Name>{data.name}</Name>

                <About>
                    <Rent>
                        <Period>{data.rent.period}</Period>
                        <Price>{`R$ ${data.rent.price}`}</Price>
                    </Rent>

                    <Type>
                        <GasolineSvg width={RFValue(20)} height={RFValue(20)} />
                    </Type>
                </About>

            </Details>

            <CarImage
                source={{ uri: data.thumbnail }}
                resizeMode="contain"
            />

        </Container>
    );
}