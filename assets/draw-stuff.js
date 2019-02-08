// Draw stuff
// Time-stamp: <2019-01-21 20:08:33 Chuck Siska>
// ------------------------------------------------------------
// FUN. Draw filled rect.
var x_str_pos = 84;
var y_str_pos = 54;
var start_array=[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0];
var current_array = start_array;
var next_array=[];

function draw_rect( ctx, stroke, fill ) 
{
    stroke = stroke || 'lightgrey';
    fill = fill || 'dimgrey';
    ctx.save( );
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    ctx.lineWidth = 5;
    ctx.rect(75, 50, canvas.width - 150, canvas.height - 100);
    ctx.stroke();
    ctx.fill();
    ctx.restore( );
}

// =====================================================  draw_grid ====
function draw_grid( rctx, rminor, rmajor, rstroke, rfill  ) 
{
    rctx.save( );
    rctx.strokeStyle = rstroke;
    rctx.fillStyle = rfill;
    let width = rctx.canvas.width;
    let height = rctx.canvas.height;
    for ( var ix = 0; ix < width; ix += rminor )
    {
        rctx.beginPath( );
        rctx.moveTo( ix, 0 );
        rctx.lineTo( ix, height );
        rctx.lineWidth = ( ix % rmajor == 0 ) ? 0.5 : 0.25;
        rctx.stroke( );
        if ( ix % rmajor == 0 ) { rctx.fillText( ix, ix, 10 ); }
    }
    for ( var iy = 0; iy < height; iy += rminor )
    {
        rctx.beginPath( );
        rctx.moveTo( 0, iy );
        rctx.lineTo( width, iy );
        rctx.lineWidth = ( iy % rmajor == 0 ) ? 0.5 : 0.25;
        rctx.stroke( );
        if ( iy % rmajor == 0 ) {rctx.fillText( iy, 0, iy + 10 );}
    }
    rctx.restore( );
}

//====================================================== draw box
function draw_box( ctx, x_pos, y_pos ) //, stroke, fill ) 
{
    stroke = 'black';
    fill = 'black';
    ctx.save( );
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    ctx.lineWidth = 5;
    //ctx.rect(194, 54, 3, 3);
    ctx.rect(x_pos, y_pos, 3, 3 )
    ctx.stroke();
    ctx.fill();
    ctx.restore( );
}

//====================================================== make next line
function find_next (ctx)
{
    
    for(var y = 0; y < 28; y++) 
    {   
        var next_array = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        console.log(current_array);
        // display current array
        for(var w = 0; w < current_array.length; w++)
        {
            if(current_array[w] == 1)
            {
                draw_box(ctx,x_str_pos + 10*w, y_str_pos + y*10);
            }
        }
        for(var x = 0; x < 22; x++)
        {
            if( current_array[x] == 1) // 1??
            {
                if(current_array[x+1] == 1) // 11? 
                {
                    // no need to check 111
                    if(current_array[x+2] == 0) // 110
                    {
                        next_array[x+1] = 1
                    }
                }
                else  // 10?
                {
                    // no need to check 101
                    if(current_array[x+2] == 0) // 100
                    {
                        next_array[x+1] = 1;
                    }
                }
            }
            else // 0??
            {
                if(current_array[x+1] == 1) // 01? 
                {
                    if(current_array[x+2] == 1) // 011
                    {
                        next_array[x+1] = 1;
                    }
                    // no need to check 010
                }
                else  // 00?
                {
                    if(current_array[x+2] == 1) // 001
                    {
                        next_array[x+1] = 1;
                    }
                    // no need to check // 000
                }
            }
        }
        current_array = next_array;
    }
}
