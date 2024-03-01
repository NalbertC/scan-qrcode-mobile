import { Ionicons } from "@expo/vector-icons";
import {
  BarcodeScanningResult,
  Camera,
  CameraType,
  CameraView,
  PermissionResponse,
} from "expo-camera/next";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Linking,
  Pressable,
  Text,
  View,
} from "react-native";

interface ScannerProps { }
const SCREEN_HORIZONTAL_PAD = Dimensions.get("screen").width;

export function Scanner({ }: ScannerProps) {
  const [hasPermission, setHasPermission] = useState<PermissionResponse | null>(
    null,
  );
  const [scanned, setScanned] = useState(false);
  const [qrCodeData, setQRCodeData] = useState("");
  const [facing, setFacing] = useState<CameraType>("back");
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status);
    })();
  }, []);

  if (!hasPermission) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (!hasPermission.granted) {
    return <Text>No access to camera</Text>;
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  function toggleFlash() {
    setFlash(!flash);
  }

  const handleBarCodeScanned = async ({
    type,
    data,
  }: BarcodeScanningResult) => {
    setScanned(true);

    // Verifica se o QR Code é um link para um site
    if (
      data.toLowerCase().startsWith("http://") ||
      data.toLowerCase().startsWith("https://")
    ) {
      Alert.alert(
        `Link Escaneado`,
        `Deseja abrir o link?`,
        [
          {
            text: "Cancelar",
            onPress: () => setScanned(false),
            style: "cancel",
          },
          { text: "Abrir", onPress: () => openLink(data) },
        ],
        { cancelable: false },
      );
    } else {
      Alert.alert(`Conteúdo do QR Code`, data);
    }

    //----------------------------------------
  };

  const openLink = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Não é possível abrir o link: ${url}`);
      }
    } catch (error) {
      console.error(`Erro ao abrir o link: ${url}`, error);
      Alert.alert(`Erro`, `Falha ao abrir o link`);
    } finally {
      setScanned(false);
    }
  };

  return (
    <CameraView
      onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      barcodeScannerSettings={{
        barcodeTypes: ["qr"],
      }}
      facing={facing}
      enableTorch={flash}
    >
      <View className="h-full w-full justify-between items-center">
        <View />
        <View
          className="rounded-3xl justify-between"
          style={{
            height: SCREEN_HORIZONTAL_PAD - 80,
            width: SCREEN_HORIZONTAL_PAD - 80,
          }}
        >
          <View className="flex-row w-full justify-between rounded-3xl">
            <View className="border-t-8 border-l-8 border-white h-14 w-14 rounded-tl-[32] " />
            <View className="border-t-8 border-r-8 border-white h-14 w-14 rounded-tr-[32] " />
          </View>
          <View className="flex-row w-full justify-between">
            <View className="border-b-8 border-l-8 border-white h-14 w-14 rounded-bl-[32] " />
            <View className="border-b-8 border-r-8 border-white h-14 w-14 rounded-br-[32] " />
          </View>
        </View>
        <View className="pb-6 flex-row justify-evenly w-full">
          <Pressable
            className="h-14 bg-white w-14 rounded-full items-center justify-center"
            onPress={toggleCameraFacing}
          >
            <Ionicons name="camera-reverse-outline" size={24} />
          </Pressable>

          <Pressable
            className="h-14 bg-white w-14 rounded-full items-center justify-center"
            onPress={toggleFlash}
          >
            <Ionicons name="flashlight" size={24} />
          </Pressable>
        </View>
      </View>
    </CameraView>
  );
}
