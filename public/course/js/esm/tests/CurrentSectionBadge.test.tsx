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
 * Tests for core_course/CurrentSectionBadge.
 *
 * @copyright  2026 Rajneel Totaram <rajneel.totaram@moodle.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {render} from '@testing-library/react';
import CurrentSectionBadge from '@moodle/lms/core_course/CurrentSectionBadge';

// @moodlehq/design-system is ESM only, so Jest cannot resolve it from a CommonJS test bundle.
// Stand Badge in with markup exposing the props it receives.
jest.mock('@moodlehq/design-system', () => ({
    Badge: ({label, variant, pill}: {label: string; variant: string; pill: boolean}) => (
        <span data-testid="ds-badge" data-variant={variant} data-pill={String(pill)}>{label}</span>
    ),
}), {virtual: true});

describe('core_course/CurrentSectionBadge', () => {
    it('renders the label as a primary pill badge', () => {
        const {getByTestId} = render(<CurrentSectionBadge label="Highlighted" />);
        const badge = getByTestId('ds-badge');
        expect(badge.textContent).toBe('Highlighted');
        expect(badge.dataset.variant).toBe('primary');
        expect(badge.dataset.pill).toBe('true');
    });
});
