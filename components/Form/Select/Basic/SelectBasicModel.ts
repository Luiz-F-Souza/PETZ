import { KeyboardEvent } from 'react'
import { SelectOptionsFormatType } from 'types/generals';

export interface SelectBasicModel {

  isOpen: boolean;
  handleCloseDropDown: () => void;
  handleOpenDropDown: () => void;
  handleKeyUp: (event: KeyboardEvent<HTMLDivElement>) => void;
  currentIndexToSelect: number;
  handleMouseLeave: () => void;
  handleMouseEnter: (index: number) => void;
  handleSelectOption: (index?: number) => void;
}