export const stateToFormData = (state: {}): FormData => {
  const data = new FormData()
  Object.entries(state).forEach(
    ([key, value]: [string, any]) => {
      data.append(key, value)
    })
  return data;
}