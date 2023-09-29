import fetchShutdownData from '../../api/shutdownData';

export default async (req, res) => {
  const shutdownData = await fetchShutdownData();
  res.json(shutdownData);
};
