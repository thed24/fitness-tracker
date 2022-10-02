export interface SettingSection {
  title: string;
  key: string;
  options: {
    title: string;
    value: string;
  }[];
}

export const settingsSections = [
  {
    title: "Settings",
    data: [
      {
        title: "Dark Mode",
        key: "darkMode",
        options: [
          {
            title: "On",
            value: "true"
          },
          {
            title: "Off",
            value: "false"
          }
        ]
      },
      {
        title: "Weight Unit",
        key: "weightUnit",
        options: [
          {
            title: "Pounds",
            value: "pounds"
          },
          {
            title: "Kilograms",
            value: "kilograms"
          }
        ]
      },
      {
        title: "Measurement Unit",
        key: "measurementUnit",
        options: [
          {
            title: "Metric",
            value: "metric"
          },
          {
            title: "Imperial",
            value: "imperial"
          }
        ]
      }
    ]
  }
];
