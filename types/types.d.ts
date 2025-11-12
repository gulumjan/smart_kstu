interface BuildingData {
  id: string;
  name: string;
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  energyUsage: number;
  smartEnergyUsage: number;
}

interface ITelegramSmsBot {
  message: string;
}
