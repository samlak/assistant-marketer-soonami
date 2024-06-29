import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import util from "util"

export const getDepolymentURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_VERCEL_URL ??
    'http://localhost:3000/'

  url = url.includes('http') ? url : `https://${url}`
  
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`

  return url
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function deepConsole (value: any) {
  console.log(util.inspect(value, false, null, true))
  return ;
}