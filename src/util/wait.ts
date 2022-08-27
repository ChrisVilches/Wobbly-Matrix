export const wait = async (time: number): Promise<void> => await new Promise(resolve => setTimeout(resolve, time))
