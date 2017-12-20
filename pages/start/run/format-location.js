function formatLocation(longitude, latitude) { //格式化坐标
  longitude = longitude.toFixed(2)
  latitude = latitude.toFixed(2)
  return {
    longitude: longitude.toString().split('.'),
    latitude: latitude.toString().split('.')
  }
}
module.exports = formatLocation