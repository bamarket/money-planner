// Icons
import createIcon from "@/hocs/createIcon";
import dashLight from "@/assets/icons/dash-light.svg";
import dashDark from "@/assets/icons/dash-dark.svg";
import memberLight from "@/assets/icons/member-light.svg";
import memberDark from "@/assets/icons/member-dark.svg";
import premiumLight from "@/assets/icons/premium-light.svg";
import premiumDark from "@/assets/icons/premium-dark.svg";
import roleLight from "@/assets/icons/role-light.svg";
import roleDark from "@/assets/icons/role-dark.svg";
import settingsLight from "@/assets/icons/settings-light.svg";
import settingsDark from "@/assets/icons/settings-dark.svg";
import sixMonthEar from "@/assets/icons/6-month-earning.svg";
import anualEar from "@/assets/icons/annual-earning.svg";
import block from "@/assets/icons/block.svg";
import free from "@/assets/icons/free.svg";
import lastMonthEar from "@/assets/icons/last-month-earning.svg";
import memberFilled from "@/assets/icons/member-filled.svg";
import premiumFilled from "@/assets/icons/premium-filled.svg";
import totalEar from "@/assets/icons/total-earning.svg";
import actions from "@/assets/icons/actions.svg";

//Images
import logo from "@/assets/images/logo.png";
import signInImage from "@/assets/images/signInImage.png"
import profile from "@/assets/images/profile.jpeg";



export const ICONS = {
    dashLight: createIcon(dashLight),
    dashDark: createIcon(dashDark),
    memberLight: createIcon(memberLight),
    memberDark: createIcon(memberDark),
    premiumLight: createIcon(premiumLight),
    premiumDark: createIcon(premiumDark),
    roleLight: createIcon(roleLight),
    roleDark: createIcon(roleDark),
    settingsLight: createIcon(settingsLight),
    settingsDark: createIcon(settingsDark),
    sixMonthEar: createIcon(sixMonthEar),
    anualEar: createIcon(anualEar),
    block: createIcon(block),
    free: createIcon(free),
    lastMonthEar: createIcon(lastMonthEar),
    memberFilled: createIcon(memberFilled),
    premiumFilled: createIcon(premiumFilled),
    totalEar: createIcon(totalEar),
    actions: createIcon(actions),
};


export const IMAGES = {
    logo,
    profile,
    signInImage
};
