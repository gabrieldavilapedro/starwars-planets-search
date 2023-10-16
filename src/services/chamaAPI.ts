export const getInfoStarWars = async () => {
  const URL = 'https://swapi.dev/api/planets';
  try {
    const response = await fetch(URL);
    const apiResponse = await response.json();

    return apiResponse.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};
