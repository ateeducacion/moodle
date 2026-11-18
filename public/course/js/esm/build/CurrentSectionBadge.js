import{Badge as e}from"@moodlehq/design-system";import{jsx as n}from"react/jsx-runtime";/**
 * The badge that marks the current (highlighted) section in the course index.
 *
 * Mounted from core_courseformat/local/courseindex/section. The mount point keeps the label as
 * plain text until this component takes over.
 *
 * @module     core_course/CurrentSectionBadge
 * @copyright  2026 Rajneel Totaram <rajneel.totaram@moodle.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */function t({label:r}){return n(e,{label:r,variant:"primary",pill:!0})}export{t as default};
