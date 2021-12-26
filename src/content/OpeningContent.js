/**
 * @class
 * @extends {next2d.fw.Context}
 */
export class OpeningContent extends next2d.fw.Content
{
    /**
     * @constructor
     * @public
     */
    constructor ()
    {
        super();
    }

    /**
     * @return {string}
     */
    get namespace ()
    {
        return "Opening";
    }

    /**
     * @return {string}
     */
    get contentName ()
    {
        return "OpeningContent";
    }
}