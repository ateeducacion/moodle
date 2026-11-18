// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

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

import {Badge} from '@moodlehq/design-system';

export type CurrentSectionBadgeProps = {
    /** The translated label of the badge, for example "Highlighted" or "Current week". */
    label: string;
};

/**
 * Render the current section badge.
 *
 * @param props Component props.
 * @returns The rendered badge.
 */
export default function CurrentSectionBadge({label}: CurrentSectionBadgeProps) {
    return <Badge label={label} variant='primary' pill />;
}
