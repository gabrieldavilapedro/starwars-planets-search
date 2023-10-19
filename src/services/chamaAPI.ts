export const getInfoStarWars = async () => {
  const URL = 'https://swapi.dev/api/planets';
  try {
    const response = await fetch(URL);
    const apiResponse = await response.json();
    console.log(apiResponse.results);

    return apiResponse.results;
  } catch (error) {
    return [];
  }
};
