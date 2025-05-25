// utils.js
import { DateTime } from 'luxon'

export function calculateAge(dobStr) {
    if (!dobStr) return "-"; // Handle undefined or empty DOB
    const dob = DateTime.fromFormat(dobStr, 'yyyy-MM-dd HH:mm:ss', { zone: 'Europe/Rome' })
    // Get the current date in the same timezone
    const now = DateTime.now().setZone('Europe/Rome');
    // Compute the age difference
    const age = now.diff(dob, 'years').years;
    return Math.floor(age);
}

export function formatDate (dateString) {
    //console.log(dateString)
    if (dateString === undefined || dateString=="") return ''
    const dateAndHour = dateString.split(' ');
    const format = dateAndHour.length==2? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd'
    const localDate = DateTime.fromFormat(dateString, format, { zone: 'Europe/Rome' })
    return localDate.toFormat('yyyy-MM-dd')
  }

//   const formatDate = (dateString) => {
//     if (dateString === undefined || dateString=="") return ''
//     const date = new Date(dateString)
//     return date.toISOString().split('T')[0] // Extracts yyyy-MM-dd
//   }
