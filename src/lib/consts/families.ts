import { Type } from '../../models';

export const GLOVE_FAMILIES = [
    'Bloodhound Gloves',
    'Broken Fang Gloves',
    'Driver Gloves',
    'Hand Wraps',
    'Hydra Gloves',
    'Moto Gloves',
    'Specialist Gloves',
    'Sport Gloves',
];

export const HEAVY_FAMILIES = [
    'MAG-7',
    'Nova',
    'Sawed-Off',
    'XM1014',
    'M249',
    'Negev',
];

export const KNIFE_FAMILIES = [
    'Talon Knife',
    'Ursus Knife',
    'Navaja Knife',
    'Classic Knife',
    'Falchion Knife',
    'Karambit',
    'Paracord Knife',
    'Nomad Knife',
    'Stiletto Knife',
    'Survival Knife',
    'Bowie Knife',
    'Shadow Daggers',
    'Gut Knife',
    'Skeleton Knife',
    'Butterfly Knife',
    'Huntsman Knife',
    'M9 Bayonet',
    'Flip Knife',
    'Bayonet',
];

export const PISTOL_FAMILIES = [
    'CZ75-Auto',
    'Desert Eagle',
    'Dual Berettas',
    'Five-SeveN',
    'Glock-18',
    'P2000',
    'P250',
    'R8 Revolver',
    'Tec-9',
    'USP-S',
];

export const RIFLE_FAMILIES = [
    'AK-47',
    'AUG',
    'FAMAS',
    'Galil AR',
    'M4A1-S',
    'M4A4',
    'SG 553',
    'AWP',
    'G3SG1',
    'SCAR-20',
    'SSG 08',
];

export const SMG_FAMILIES = [
    'MAC-10',
    'MP5-SD',
    'MP7',
    'MP9',
    'P90',
    'PP-Bizon',
    'UMP-45',
];

export const ITEM_FAMILIES_BY_TYPE: Omit<
    {
        [key in Type]: string[];
    },
    'sticker' | 'case' | 'pin' | ''
> = {
    glove: GLOVE_FAMILIES,
    heavy: HEAVY_FAMILIES,
    knife: KNIFE_FAMILIES,
    rifle: RIFLE_FAMILIES,
    smg: SMG_FAMILIES,
    pistol: PISTOL_FAMILIES,
};
