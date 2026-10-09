/** Line-icon paths (24×24, 2.25px stroke, round caps). Add new icons here. */
export const iconPaths = {
  sun: '<circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8 6 18M18 6l1.8-1.8"/>',
  drop: '<path d="M12 2.8s6.5 7.1 6.5 11.7a6.5 6.5 0 0 1-13 0C5.5 9.9 12 2.8 12 2.8Z"/>',
  paw: '<circle cx="6" cy="10" r="2"/><circle cx="10" cy="5.5" r="2"/><circle cx="14" cy="5.5" r="2"/><circle cx="18" cy="10" r="2"/><path d="M12 11c-3 0-6 4.5-6 7a3 3 0 0 0 3 3c1.2 0 2-.6 3-.6s1.8.6 3 .6a3 3 0 0 0 3-3c0-2.5-3-7-6-7Z"/>',
  thermo: '<path d="M14 14.8V5a2 2 0 1 0-4 0v9.8a4 4 0 1 0 4 0Z"/><path d="M12 9v7"/>',
  soil: '<path d="M3 15h18M5 19h14M8 11c0-3 2-5 4-6 2 1 4 3 4 6"/><path d="M12 5v10"/>',
  sprout: '<path d="M12 21v-9"/><path d="M12 12C12 7 8.5 4.5 4 4.5 4 9 7 12 12 12Z"/><path d="M12 14c0-4 3-6.5 8-6.5 0 4-3 6.5-8 6.5Z"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  ruler: '<path d="m3 17 14-14 4 4L7 21Z"/><path d="m7 13 2 2M10 10l2 2M13 7l2 2"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  sliders: '<path d="M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1"/><circle cx="15" cy="6" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="17" cy="18" r="2"/>',
  arrow: '<path d="M4 12h15M13 6l6 6-6 6"/>',
  check: '<path d="m4.5 12.5 5 5 10-11"/>',
  alert: '<path d="M12 3 2 20.5h20Z"/><path d="M12 10v4.5M12 17.5v.01"/>',
  stethoscope: '<path d="M6 3v6a5 5 0 0 0 10 0V3"/><path d="M11 14v2a4.5 4.5 0 0 0 9 0v-2"/><circle cx="20" cy="12" r="2"/>',
  book: '<path d="M4 4.5h6a2 2 0 0 1 2 2V20a2 2 0 0 0-2-2H4ZM20 4.5h-6a2 2 0 0 0-2 2V20a2 2 0 0 1 2-2h6Z"/>',
  bag: '<path d="M5 8h14l-1 12.5H6Z"/><path d="M9 10V6.5a3 3 0 0 1 6 0V10"/>',
  heart: '<path d="M12 20s-8-4.8-8-10.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5C20 15.2 12 20 12 20Z"/>',
  cactus: '<path d="M12 21V5a2.5 2.5 0 0 1 5 0v0"/><path d="M12 5a2.5 2.5 0 0 0-5 0v4a3 3 0 0 0 3 3h2"/><path d="M17 5v6a3 3 0 0 1-3 3h-2"/><path d="M7 21h10"/>',
  rosette: '<path d="M12 20c-4-1.5-7-4.5-7-8 3 0 5.5 2 7 8Z"/><path d="M12 20c4-1.5 7-4.5 7-8-3 0-5.5 2-7 8Z"/><path d="M12 20c-2-3-2.5-8 0-13 2.5 5 2 10 0 13Z"/>',
  pot: '<path d="M4 9h16l-1.5 3H5.5Z"/><path d="M6 12l1.5 8h9L18 12"/><path d="M12 9V6M12 6c0-2 1.5-3 3.5-3 0 2-1.5 3-3.5 3ZM12 6c0-2-1.5-3-3.5-3 0 2 1.5 3 3.5 3Z"/>',
  leaf: '<path d="M5 19C5 10 10 5 20 4c-1 10-6 15-15 15Z"/><path d="M5 19 13 11"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.01"/>',
  scissors: '<circle cx="6" cy="7" r="2.5"/><circle cx="6" cy="17" r="2.5"/><path d="M8 8.5 20 17M8 15.5 20 7"/>',
} as const;

export type IconName = keyof typeof iconPaths;
export const iconNames = Object.keys(iconPaths) as IconName[];
