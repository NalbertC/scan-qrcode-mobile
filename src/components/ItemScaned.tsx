import dayjs from "dayjs";
import { useState } from "react";
import { ActivityIndicator, Alert, Button, Text, View } from "react-native";

import { ICabecalho, IEmitente, IProduto } from "~/@types/nfe-dados";
import { api } from "~/services/api";

interface IData {
  cabecalho: ICabecalho;
  emitente: IEmitente;
  produtos: IProduto[];
}

interface ItemScanedProps { }

export function dateFarmater(date: Date) {
  const formater = dayjs(date).locale("pt-br").format("DD/MM/YYYY HH:mm");
  return formater;
}

export function ItemScaned({ }: ItemScanedProps) {
  const [info, setInfo] = useState<IData>();
  const [loading, setLoading] = useState(false);

  async function handleData() {
    try {
      setLoading(true);
      const { data } = await api.get("/");

      setInfo(data);

      Alert.alert(
        `Dados`,
        `Local: ${info?.emitente.nome}\nTotal: ${new Intl.NumberFormat(
          "pt-BR",
          {
            style: "currency",
            currency: "BRL",
          },
        ).format(
          info?.cabecalho.total!,
        )}\nData: ${dateFarmater(info?.cabecalho.dataEmissao!)}`,
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View>
      {loading && <ActivityIndicator />}
      { }
      <View>
        <Text>Local: {info?.emitente.nome}</Text>
        <Text>Total: {info?.cabecalho.modelo}</Text>
        <Text>Data: {info?.cabecalho.dataEmissao}</Text>
      </View>
      <Button title="Adicionar" onPress={handleData} />
    </View>
  );
}
