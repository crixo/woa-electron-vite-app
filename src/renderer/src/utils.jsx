// utils.js
import { DateTime } from 'luxon'

export function calculateAge(dobStr) {
    if (!dobStr) return "-"; // Handle undefined or empty DOB

    // const birthDate = new Date(dob);
    // const today = new Date();
    
    // let age = today.getFullYear() - birthDate.getFullYear();
    // const monthDiff = today.getMonth() - birthDate.getMonth();
    // const dayDiff = today.getDate() - birthDate.getDate();
    
    // if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    //     age--;
    // }

    const dob = DateTime.fromFormat(dobStr, 'yyyy-MM-dd HH:mm:ss', { zone: 'Europe/Rome' })
    // Get the current date in the same timezone
    const now = DateTime.now().setZone('Europe/Rome');
        
    // Compute the age difference
    const age = now.diff(dob, 'years').years;

    return Math.floor(age);
}

export function formatDate (dateString) {
    if (dateString === undefined || dateString=="") return ''
    const localDate = DateTime.fromFormat(dateString, 'yyyy-MM-dd HH:mm:ss', { zone: 'Europe/Rome' })
    console.log(localDate.toString())
    return localDate.toFormat('yyyy-MM-dd')
  }
