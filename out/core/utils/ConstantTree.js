"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constantTree = void 0;
/**
 * Populate an empty event tree structure
 * Ex : {
 *  ROOT: "",
 *  ACTION: {
 *    SUB_ACTION: ""
 *  }
 * }
 *
 * Will become :
 *
 * {
 *  ROOT: "ROOT",
 *  ACTION: {
 *    SUB_ACTION: "ACTION.SUB_ACTION"
 *  }
 * }
 * @param tree The event tree structure
 * @param route The initial starting route
 */
function constantTree(tree, route = "") {
    for (const item in tree) {
        const currentRoute = `${route}${route !== "" ? "." : ""}${item}`;
        if (typeof (tree[item]) === "string" && tree[item].length === 0) {
            tree[item] = currentRoute;
            continue;
        }
        if (typeof (tree[item]) === "object") {
            constantTree(tree[item], currentRoute);
        }
    }
    return tree;
}
exports.constantTree = constantTree;
