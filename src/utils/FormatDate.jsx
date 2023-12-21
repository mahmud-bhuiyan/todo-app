export const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = date.getDate();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${day}-${monthNames[monthIndex]}-${year}`;
};
