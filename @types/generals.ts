
export type SelectSingleOptionFormatType = {
  label: string,
  value: string,
  id: string
}

export type SelectOptionsFormatType = SelectSingleOptionFormatType[]


export type SingleCityType = {
  name: string,
  locationUrl: string
}

export type CitiesByRegion =
  Record<
    string,
    {
      id: string,
      cities: SingleCityType[]
    }
  >