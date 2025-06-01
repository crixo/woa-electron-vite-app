// utils.js
import { DateTime } from 'luxon'
import { useSettings } from '../data/SettingsContext';

export function calculateAge(dobStr) {
    if (!dobStr) return "-"; // Handle undefined or empty DOB
    const dateAndHour = dobStr.split(' ');
    const format = dateAndHour.length==2? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd'
    const dob = DateTime.fromFormat(dobStr, format, { zone: 'Europe/Rome' })
    // Get the current date in the same timezone
    const now = DateTime.now().setZone('Europe/Rome');
    // Compute the age difference
    const age = now.diff(dob, 'years').years;
    return Math.floor(age);
}


export function formatDate (dateString, formatOutput, formatInput='yyyy-MM-dd') {
    console.log(dateString)
    if (dateString === undefined || dateString=="") return ''
    const localDate = DateTime.fromFormat(dateString, formatInput, { zone: 'Europe/Rome' })
    return localDate.toFormat(formatOutput)
}

export function formatDateForFormField (dateString) {
    console.log(dateString)
    if (dateString === undefined || dateString=="") return ''
    const dateAndHour = dateString.split(' ');
    const format = dateAndHour.length==2? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd'
    const localDate = DateTime.fromFormat(dateString, format, { zone: 'Europe/Rome' })
    return localDate.toFormat('yyyy-MM-dd')
  }

export function formatDateAsSettings (dateString) {
    //console.log(dateString)
    if (dateString === undefined || dateString=="") return ''
    const dateAndHour = dateString.split(' ');
    const format = dateAndHour.length==2? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd'
    const localDate = DateTime.fromFormat(dateString, format, { zone: 'Europe/Rome' })
    const settings = useSettings()
    return localDate.toFormat(settings.formatDate)
  }

//   const formatDate = (dateString) => {
//     if (dateString === undefined || dateString=="") return ''
//     const date = new Date(dateString)
//     return date.toISOString().split('T')[0] // Extracts yyyy-MM-dd
//   }
