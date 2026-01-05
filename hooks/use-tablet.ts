import * as Device from 'expo-device';
import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

export function useIsTablet() {
    const { width, height } = useWindowDimensions();

    return useMemo(() => {
        if (Device.deviceType === Device.DeviceType.TABLET) {
            return true;
        }

        const smallestDimension = Math.min(width, height);
        return smallestDimension >= 600;
    }, [width, height]);
}
