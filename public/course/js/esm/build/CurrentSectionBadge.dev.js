var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { jsxDEV } from "react/jsx-dev-runtime";
/**
 * The badge that marks the current (highlighted) section in the course index.
 *
 * Mounted from core_courseformat/local/courseindex/section. The mount point keeps the label as
 * plain text until this component takes over.
 *
 * @module     core_course/CurrentSectionBadge
 * @copyright  2026 Rajneel Totaram <rajneel.totaram@moodle.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import { Badge } from "@moodlehq/design-system";
function CurrentSectionBadge({ label }) {
  return /* @__PURE__ */ jsxDEV(Badge, { label, variant: "primary", pill: true }, void 0, false, {
    fileName: "public/course/js/esm/src/CurrentSectionBadge.tsx",
    lineNumber: 41,
    columnNumber: 12
  }, this);
}
__name(CurrentSectionBadge, "CurrentSectionBadge");
export {
  CurrentSectionBadge as default
};
//# sourceMappingURL=CurrentSectionBadge.dev.js.map
