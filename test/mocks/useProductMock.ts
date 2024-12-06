export const mockUseProductsBase = {
  filteredProducts: [],
  error: null,
  isLoading: false,
  isPaginating: false,
  filterValue: '',
  lastItemRef: null,
  onInputChange: jest.fn(),
  isErrorVisible: false,
  handleCloseError: jest.fn(),
}

export const mockUseProducts = (overrides = {}) => ({
  ...mockUseProductsBase,
  ...overrides,
})