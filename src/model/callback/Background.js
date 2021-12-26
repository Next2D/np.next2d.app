/**
 * @class
 * @extends {next2d.fw.Model}
 */
export class Background extends next2d.fw.Model
{
    /**
     * @constructor
     * @public
     */
    constructor()
    {
        super();

        if (!Background.shape) {

            const { Shape, GradientType } = next2d.display;
            const { Matrix } = next2d.geom;

            const shape = new Shape();
            shape.name = "background";

            const width  = this.config.stage.width;
            const height = this.config.stage.height;

            const matrix = new Matrix();
            matrix.createGradientBox(width, height, Math.PI / 2);

            shape
                .graphics
                .beginGradientFill(
                    GradientType.LINEAR,
                    ["#1461A0", "#ffffff"],
                    [0.6, 1],
                    [0, 255],
                    matrix
                )
                .drawRect(0, 0, width, height)
                .endFill();

            Background.shape = shape;
        }
    }

    /**
     * @return {void}
     * @public
     */
    execute ()
    {
        const { Event } = next2d.events;

        const stage = this.context.root.stage;
        if (!stage.hasEventListener(Event.RESIZE)) {
            stage.addEventListener(Event.RESIZE, function ()
            {
                this._$createShape();
            }.bind(this));
        }

        this._$createShape();
    }

    /**
     * @return {void}
     * @private
     */
    _$createShape ()
    {
        const view = this.context.view;
        if (!view) {
            return ;
        }

        const root   = this.context.root;
        const width  = this.config.stage.width;
        const height = this.config.stage.height;

        let shape = view.getChildByName("background");
        if (!shape) {
            shape = view.addChildAt(Background.shape, 0);
        }

        const player = root.stage.player;

        const tx = player.x;
        if (tx) {
            const scaleX = player.scaleX;
            shape.scaleX = (width + tx * 2 / scaleX) / width;
            shape.x = -tx / scaleX;
        }

        const ty = player.y;
        if (ty) {
            const scaleY = player.scaleY;
            shape.scaleY = (height + ty * 2 / scaleY) / height;
            shape.y = -ty / scaleY;
        }
    }
}

/**
 * @type {next2d.display.Shape}
 * @default null
 * @static
 */
Background.shape = null;