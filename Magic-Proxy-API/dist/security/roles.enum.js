"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRolesFromBits = exports.RoleKeys = exports.Roles = void 0;
exports.Roles = {
    Manager: 'manager',
    Administrator: 'admin'
};
exports.RoleKeys = Object.values(exports.Roles);
function getRolesFromBits(role) {
    let roleKeys = [];
    exports.RoleKeys.map((v, k) => {
        if ((role & (k + 1)) == (k + 1))
            roleKeys.push(k);
    });
    return roleKeys.map(v => exports.RoleKeys[v]);
}
exports.getRolesFromBits = getRolesFromBits;
//# sourceMappingURL=roles.enum.js.map