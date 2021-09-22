export declare const Roles: {
    Manager: string;
    Administrator: string;
};
export declare const RoleValues: string[];
export declare function getRolesFromBits(role: number): string[];
export declare function getBitsFromRoles(roles: string[]): number;
